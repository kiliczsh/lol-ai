import { ChatMessage } from '@ampt/ai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function Block(chatMessage: ChatMessage) {
    const lines = chatMessage.content.split('\n');
    let isCodeBlock = false;
    let codeBlock = '';
    let codeLanguage = '';

    return (
        <div>
            {lines.map((line, index) => {
                if (line.trim().startsWith('```') && !isCodeBlock) {
                    isCodeBlock = true;
                    codeLanguage = line.trim().slice(3);
                    return null;
                }
                else if (line.trim().startsWith('```') && isCodeBlock) {
                    isCodeBlock = false;
                    const codeElement = (
                        <div key={index}>
                            <pre>
                                <SyntaxHighlighter language={codeLanguage}>
                                    {codeBlock}
                                </SyntaxHighlighter>
                            </pre>
                        </div>
                    );
                    codeBlock = '';
                    return codeElement;
                }
                else if (isCodeBlock) {
                    codeBlock += line + '\n';
                    return null;
                } else {
                    const inlineCodePattern = /`([^`]*)`/g;
                    let parsedLine = line;
                    let match;
                    while ((match = inlineCodePattern.exec(line)) !== null) {
                        const inlineCode = match[1];
                        const startIndex = line.indexOf(match[0]);
                        const endIndex = startIndex + match[0].length;
                        parsedLine = (
                            parsedLine.substring(0, startIndex) +
                            `<code>${inlineCode}</code>` +
                            parsedLine.substring(endIndex)
                        );
                    }
                    return <div key={index} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
                }
            })}
        </div>
    );
}