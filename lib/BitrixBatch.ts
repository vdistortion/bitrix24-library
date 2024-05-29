import { IBitrix24Batch, IHandlerList, BatchRequestType } from '../types';

export class BitrixBatch implements IBitrix24Batch {
  private readonly callBatch: Function;
  private handler: IHandlerList;
  private commands: any[] = [];
  private result: {} = {};
  private errors: {} = {};
  private readonly delay: number = 500;
  private readonly limit: number = 50;

  constructor(callBatch: Function, handlerList: IHandlerList = {}) {
    this.callBatch = callBatch;
    this.handler = handlerList;
  }

  batch(request: BatchRequestType) {
    this.commands = [];
    this.result = {};
    this.errors = {};

    return new Promise((resolve, reject) => {
      const requestList = this.parseRequest(request);
      const payloadList: any[][] = [];
      let errorsCount = 0;

      this.callBatch(requestList, (result: { [s: string]: unknown } | ArrayLike<unknown>) => {
        Object.entries(result).forEach(([key, value]) => {
          // @ts-ignore
          const error = value.error();

          if (error) {
            // @ts-ignore
            this.errors[key] = error;
            errorsCount += 1;
          }

          // @ts-ignore
          const total = value.total();
          // @ts-ignore
          const data = value.data();
          let dataLength = 1;

          if (data) {
            if (Array.isArray(data.items)) dataLength = data.items.length;
            else if (Array.isArray(data)) dataLength = data.length;
          }

          // @ts-ignore
          this.result[key] = data;

          if (total > this.limit && total > dataLength) {
            const length = Math.ceil(total / this.limit) - 1;
            const iterator = Array.from({ length });
            // @ts-ignore
            payloadList.push([key, requestList[key], iterator]);
          }
        });

        if (errorsCount > 0) {
          this.errorLogger();
          reject(this.errors);
        } else if (payloadList.length) {
          this.buildCommandsArray(payloadList);
          this.batchPayload().then(() => resolve(this.parseResult()));
        } else {
          resolve(this.parseResult());
        }
      });
    });
  }

  buildCommandsArray(payloadList: any[][]) {
    let array: (string | any[])[][] = [];

    payloadList.forEach(([key, request, iterator]) => {
      iterator.forEach((_: any, i: number) => {
        const index = i + 1;
        const start = this.limit * index;
        const newKey = [key, index].join('_');
        const command = [newKey, this.addStart(request, start)];

        if (array.length === this.limit) {
          this.commands.push(array);
          array = [command];
        } else {
          array.push(command);
        }
      });
    });

    if (array.length) this.commands.push(array);
  }

  batchPayload() {
    const payloads: any[] = [];

    this.commands.forEach((command) => {
      const request = Object.fromEntries(command);
      const chunk = new Promise<void>((resolve) => {
        setTimeout(() => {
          this.callBatch(request, (result: { [s: string]: unknown } | ArrayLike<unknown>) => {
            Object.entries(result).forEach(([oldKey, value]) => {
              const [key] = oldKey.split('_');
              // @ts-ignore
              const data = value.data();
              if (data?.items) {
                // @ts-ignore
                this.result[key].items.push(...data.items);
              } else if (Array.isArray(data)) {
                // @ts-ignore
                this.result[key].push(...data);
              }
            });

            resolve();
          });
        }, this.delay);
      });

      payloads.push(chunk);
    });

    return Promise.all(payloads);
  }

  parseResult() {
    Object.entries(this.handler).forEach(([key, handler]) => {
      // @ts-ignore
      if (this.result[key]) this.result[key] = handler(this.result[key]);
    });

    return this.result;
  }

  // eslint-disable-next-line class-methods-use-this
  parseRequest(r: { [s: string]: unknown } | ArrayLike<unknown>) {
    return Object.entries(r).reduce((acc, [key, request]) => {
      if (Array.isArray(request)) {
        const [method, params = {}] = request;
        // @ts-ignore
        acc[key] = [method, params];
      } else {
        // @ts-ignore
        const { method, params = {} } = request;
        // @ts-ignore
        acc[key] = [method, params];
      }

      return acc;
    }, {});
  }

  // eslint-disable-next-line class-methods-use-this
  addStart(request: [any, any], start: number) {
    const [method, params] = request;
    return [method, { start, ...params }];
  }

  errorLogger() {
    console.group(`${this.constructor.name}: Ошибки в методах!`);

    Object.entries(this.errors).forEach(([key, error]) => {
      // @ts-ignore
      console.info(`[${key}]`, error.toString());
    });

    console.groupEnd();
  }
}
