import React, { useEffect } from 'react';
import { Button } from './PDFConverterContainer.styles';
import { marked } from 'marked';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import ReactMarkdown from 'react-markdown';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface PDFConverterContainerProps {
  card: any;
}

const PDFConverterContainer: React.FC<PDFConverterContainerProps> = ({ card }) => {

  useEffect(() => {
    const fetchContent = async () => {
      // No fetch needed since the content is coming from the card prop
    };

    fetchContent();
  }, [card]);

  const handleDownloadPDF = async () => {
    const markdownText = card.output.generatedText || 'No output generated';
    const htmlContent: string = await marked.parse(markdownText);

    // Convert HTML to pdfMake format
    const pdfMakeContent = htmlToPdfmake(htmlContent);

    // Define the PDF document
    const docDefinition = {
      content: pdfMakeContent
    };

    // Create and download the PDF
    pdfMake.createPdf(docDefinition).download('download.pdf');
  };

  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <div>
        <ReactMarkdown>
          {card.output.generatedText || 'No output generated'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PDFConverterContainer;
