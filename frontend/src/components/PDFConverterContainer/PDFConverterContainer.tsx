import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, SelectContainer, SelectLabel, Select, ContentContainer } from './PDFConverterContainer.styles';
import { marked } from 'marked';

interface PDFConverterContainerProps {
  card: any;
}

const PDFConverterContainer: React.FC<PDFConverterContainerProps> = ({ card }) => {
  const [baseFontSize, setBaseFontSize] = useState(12);
  const [htmlContent, setHtmlContent] = useState<string>('');

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseFontSize(Number(event.target.value));
  };

  useEffect(() => {
    const fetchContent = async () => {
      const markdownText = card.output.generatedText || 'No output generated';
      const parsedHtml = await marked.parse(markdownText);
      setHtmlContent(parsedHtml);
    };

    fetchContent();
  }, [card]);

  const handleDownloadPDF = async () => {
    const markdownText = card.output.generatedText || 'No output generated';

    // Convert markdown to HTML
    const htmlContent: string = await marked.parse(markdownText);

    // Define custom styles with proportional font sizes
    const styles = `
      <style>
        body { font-family: 'Times New Roman', serif; margin: 20px; font-size: ${baseFontSize}pt; }
        h1 { margin: 20px 0 10px 0; font-size: ${2 * baseFontSize}pt; }
        h2 { margin: 20px 0 10px 0; font-size: ${1.75 * baseFontSize}pt; }
        h3 { margin: 20px 0 10px 0; font-size: ${1.5 * baseFontSize}pt; }
        h4 { margin: 20px 0 10px 0; font-size: ${1.25 * baseFontSize}pt; }
        h5 { margin: 20px 0 10px 0; font-size: ${1.1 * baseFontSize}pt; }
        h6 { margin: 20px 0 10px 0; font-size: ${1 * baseFontSize}pt; }
        p { margin: 10px 0; font-size: ${1 * baseFontSize}pt; line-height: 1.6; }
        ul, ol { margin: 10px 0; padding-left: 20px; font-size: ${1 * baseFontSize}pt; }
        blockquote { margin: 10px 0; padding-left: 10px; border-left: 5px solid #ccc; font-size: ${1 * baseFontSize}pt; }
        pre { background-color: #f6f6f6; padding: 10px; border-radius: 5px; font-size: ${0.8 * baseFontSize}pt; }
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
    document.body.appendChild(container);

    // Use html2canvas to capture the content and jsPDF to create the PDF
    html2canvas(container, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'pt', 'a4');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * (pdfWidth - 40)) / imgProps.width; // Adjust height to maintain aspect ratio

      const x = 20; // Padding on the left and right
      const y = 20; // Padding on the top

      doc.addImage(imgData, 'PNG', x, y, pdfWidth - 40, pdfHeight); // Subtract padding from width
      doc.save(`${card.title}.pdf`);
      document.body.removeChild(container); // Clean up
    });
  };

  return (
    <div>
      <SelectContainer>
        <SelectLabel htmlFor="fontSizeSelector">Font Size: </SelectLabel>
        <Select id="fontSizeSelector" onChange={handleFontSizeChange} value={baseFontSize}>
          <option value="10">10pt</option>
          <option value="12">12pt</option>
          <option value="14">14pt</option>
          <option value="16">16pt</option>
          <option value="18">18pt</option>
          <option value="20">20pt</option>
        </Select>
      </SelectContainer>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <ContentContainer baseFontSize={baseFontSize} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default PDFConverterContainer;
