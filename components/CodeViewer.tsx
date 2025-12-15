import React from 'react';

interface CodeViewerProps {
  code: string;
  output?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, output }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md my-4 flex flex-col gap-0">
      {/* Code Window */}
      <div className="bg-slate-900">
        <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
            <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-xs text-slate-400 font-mono">example.ts</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
            <code>{code}</code>
        </pre>
      </div>

      {/* Output Console */}
      {output && (
        <div className="bg-black border-t-2 border-slate-700 p-4">
            <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Console Output</div>
            <pre className="font-mono text-sm text-green-400">
                {output}
            </pre>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;