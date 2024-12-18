import { PrintCertificateReq } from '@/dto/print_service/print-certificate.req';
import { GlobalConfig } from '@/utils/config/global-config.util';
import axios from 'axios';
import { log } from 'console';

export class PrintServiceUtil {
  static PRINT_SERVICE_URL = GlobalConfig.print_service.url;
  static async printCertificate(req: PrintCertificateReq): Promise<any> {
    console.log('req', req);

    const response = await axios.post(`${this.PRINT_SERVICE_URL}/generate-certificate`, req, {
      responseType: 'stream'
    });

    console.log('type', typeof response.data);

    return response.data;
  }
}
