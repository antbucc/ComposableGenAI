import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from './PDFConverterContainer.styles';
import { marked } from 'marked';

interface PDFConverterContainerProps {
  card: any;
}

const PDFConverterContainer: React.FC<PDFConverterContainerProps> = ({ card }) => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait, 'pt' for point units, 'a4' for size
    const markdownText = card.output.generatedText || 'No output generated';

    // Convert markdown to HTML
     const htmlContent: string = await Promise.resolve(marked.parse(markdownText));

    // Define custom styles
    const styles = `
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2, h3, h4, h5, h6 { margin: 20px 0 10px 0; }
        p { margin: 10px 0; font-size: 12pt; line-height: 1.6; }
        ul, ol { margin: 10px 0; padding-left: 20px; }
        blockquote { margin: 10px 0; padding-left: 10px; border-left: 5px solid #ccc; font-size: 12pt; }
        pre { background-color: #f6f6f6; padding: 10px; border-radius: 5px; font-size: 10pt; }
        .markdown-body { max-width: 100%; word-wrap: break-word; white-space: pre-wrap; }
      </style>
    `;

    // Wrap the content with the custom styles
    const styledContent = `
      <html>
        <head>
          <meta charset="utf-8">
          ${styles}
        </head>
        <body class="markdown-body">${htmlContent}</body>
      </html>
    `;

    // Create a container to hold the styled content
    const container = document.createElement('div');
    container.innerHTML = styledContent;

    // Use jsPDF html method to render the styled HTML content
    doc.html(container, {
      callback: function (doc) {
        doc.save(`${card.title}.pdf`);
      },
      x: 40,
      y: 40,
      width: 515, // Set the width to fit the content within the A4 page
      windowWidth: 800 // Use this to simulate a larger window for proper formatting
    });
  };

  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  );
};

export default PDFConverterContainer;
