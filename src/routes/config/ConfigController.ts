import { getConfig } from '../../lib/config.js';

export interface IStringToStringDictionary { [key: string]: string|number|undefined; }
export class ConfigController {
  public getAllParam(): any {
    const config = getConfig();
    return {
      host: config.host,
      port: config.port
    };
  }
}