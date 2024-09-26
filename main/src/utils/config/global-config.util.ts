import config from 'config';
import cors from 'cors';

export class GlobalConfig {
  /**
   * * Server config
   *   This is config for server such as
   * + host: host of server
   * + port: port of server
   * + api_version: the api version in the url, ex: /api/v1
   */
  static server: {
    port: number;
    host: string;
    api_version: string;
  } = config.get('server');

  /**
   * * Request limit config
   * This is config for request limit such as
   * + limit: size limit of request, ex: 100kb
   */
  static request_limit: {
    limit: string;
  } = config.get('request_limit');

  //Cors config
  /**
   * * Cors config
   * This is config for cors such as
   * + origin: origin of request, ex: http://localhost:3000
   * + methods: methods of request, ex: ["GET", "POST"]
   * + allowedHeaders: allowed headers of request, ex: ["Content-Type", "Authorization"]
   */
  static cors: cors.CorsOptions = config.get('cors');

  //Helmet config
  /**
   * * Helmet config
   * Helmet is a middleware to protect the server from some well-known web vulnerabilities by setting HTTP headers appropriately.
   * + enable: enable helmet or not
   */
  static helmet: {
    enable: boolean;
  } = config.get('helmet');

  /**
   * * Enviroment config
   * Get the enviroment of the server, ex: development, production
   */
  static enviroment: string = config.get('enviroment');

  /**
   * * Morgan config
   * Morgan is a middleware to log the request of the server
   * + format: format of the log, ex: "dev"
   */
  static morgan: {
    format: string;
  } = config.get('morgan');

  /**
   * * Swagger config
   * Swagger is a tool to document the API
   * + enable: enable swagger or not
   */
  static swagger = config.get<{
    enable: boolean;
  }>('swagger');

  /**
   * * Database config
   * + sync: sync the database or with ORM or not
   */
  static database = config.get<{
    sync: boolean;
  }>('database');
}
