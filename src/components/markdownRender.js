import React from 'react';
import Markdown from 'markdown-to-jsx';

const MarkdownRenderer = ({ children }) => {
    return <Markdown>{children}</Markdown>;
};

export default MarkdownRenderer;
