// components/MarkdownRenderer.tsx
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="
      prose prose-invert max-w-none
      prose-p:leading-relaxed
      prose-li:my-1
      prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
      prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-zinc-900 prose-pre:p-3 prose-pre:rounded-xl
      prose-img:rounded-xl prose-img:max-h-[300px] prose-img:w-auto
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}