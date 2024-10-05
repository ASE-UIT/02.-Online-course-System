class BaseError extends Error {
  public code: string;
  public msg: string;
  public data?: any;

  /**
   * Generate a new instance of BaseException
   * @param code
   * @param msg
   * @param data
   */
  constructor(code: string, msg: string, data?: any) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    this.msg = msg;
    this.data = data;
    Error.captureStackTrace(this);
  }
}
export default BaseError;
