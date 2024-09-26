export enum ErrorCode {
  //**ddPermission

  /**
   * You don't have permission to access this resource
   */
  PERMISSION_01 = 'PERMISSION_01',

  //**Authenticate

  /**
   * Authorization header is required
   */
  AUTH_01 = 'AUTH_01',

  /**
   * Invalid token. You need to login first
   */
  AUTH_02 = 'AUTH_02',

  //**Common error

  /**
   * Not found {ENTITY}
   */
  NF_01 = 'NF_01',

  /**
   * Joi validate error
   */
  VALIDATION_ERROR = 'VALIDATION_ERROR',

  /**
   * API Not Exists
   */
  API_NOT_EXISTS = 'API_NOT_EXISTS'
}
