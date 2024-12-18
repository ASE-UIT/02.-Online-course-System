import { PrintCertificateReq } from '@/dto/print_service/print-certificate.req';
import axios from 'axios';

export class PrintServiceUtil {
  static async printCertificate(req: PrintCertificateReq): Promise<any> {
    const response = await axios.post('http://localhost:5392/generate-certificate', req);

    return response.data;
  }
}
