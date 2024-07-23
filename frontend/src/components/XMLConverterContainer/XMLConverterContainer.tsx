import React from 'react';
import { Button } from './XMLConverterContainer.styles';

interface XMLConverterContainerProps {
  card: any;
}

const XMLConverterContainer: React.FC<XMLConverterContainerProps> = ({ card }) => {
  const extractXMLContent = (markdown: string): string => {
    const xmlMatch = markdown.match(/```xml\n([\s\S]*?)\n```/);
    return xmlMatch ? xmlMatch[1] : '';
  };

  const handleDownloadXML = () => {
    const markdownText = card.output?.generatedText || 'No output generated';
    const xmlContent = extractXMLContent(markdownText);

    if (!xmlContent) {
      alert('No XML content found in the generated text.');
      return;
    }

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.title}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const xmlContent = extractXMLContent(card.output?.generatedText || 'No output generated');

  return (
    <div>
      <Button onClick={handleDownloadXML}>Download XML</Button>
      <div>
        <pre>{xmlContent || 'No XML content found'}</pre>
      </div>
    </div>
  );
};

export default XMLConverterContainer;
