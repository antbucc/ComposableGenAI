import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from './PDFCOnverterContainer.styles';

interface PDFConverterContainerProps {
  card: any;
}

const PDFConverterContainer: React.FC<PDFConverterContainerProps> = ({ card }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(card.output.generatedText || 'No output generated', 10, 10);
    doc.save(`${card.title}.pdf`);
  };

  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  );
};

export default PDFConverterContainer;
