import { savePDF, PDFExport } from '@progress/kendo-react-pdf';
import { blackColor } from '../assets/jss/material-dashboard-react';

class DocService {
  createPdf = (html) => {
      savePDF(html, { 

          paperSize: 'A4',
          fileName: 'report.pdf',
        margin: { top: '2cm', left: '1.5cm', right: '1.5cm', bottom: '2cm' },
        scale: 0.8,
        keepTogether: '.card',

    })
  }
}

const Doc = new DocService();
export default Doc;