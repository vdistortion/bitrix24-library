type EntityCRMType = 'deal' | 'lead' | 'company' | 'contact' | 'quote';

export type SelectCRMType = {
  entityType?: EntityCRMType[];
  multiple?: boolean;
  value?: string[] | Record<string, number[]>;
};

export type SelectCRMResponseType = {
  [key in EntityCRMType]: Record<
    string,
    Record<'desc' | 'id' | 'place' | 'title' | 'type' | 'url', string>
  >;
};
