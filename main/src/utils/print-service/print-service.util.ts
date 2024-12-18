import { PrintCertificateReq } from '@/dto/print_service/print-certificate.req';
import axios from 'axios';
import { log } from 'console';

export class PrintServiceUtil {
  static async printCertificate(req: PrintCertificateReq): Promise<any> {
    console.log('req', req);

    const response = await axios.post('http://localhost:5392/generate-certificate', req, {
      responseType: 'stream'
    });

    console.log('type', typeof response.data);

    return response.data;
  }
}
