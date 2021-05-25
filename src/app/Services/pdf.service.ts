import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
  downloadPDF(DATA:HTMLElement): void {

    const doc = new jsPDF('p', 'pt', 'a4');

    const Options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, Options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_IDB.pdf`);
    });
  }
}
