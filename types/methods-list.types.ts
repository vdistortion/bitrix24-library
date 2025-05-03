/**
 * Список общих методов, доступных приложению независимо от запрашиваемых приложением разрешений
 */
type AppMethodsType =
  | 'scope'
  | 'app.info'
  | 'access.name'
  | 'server.time'
  | 'feature.get'
  | 'method.get'
  | 'user.admin'
  | 'user.access'
  | 'profile'
  | 'app.option.set'
  | 'app.option.get'
  | 'user.option.set'
  | 'user.option.get';

/**
 * Scope: placement
 */
type PlacementMethodsType =
  | 'placement.list'
  | 'placement.get'
  | 'placement.bind'
  | 'placement.unbind';

export type MethodsListType = AppMethodsType | PlacementMethodsType;
