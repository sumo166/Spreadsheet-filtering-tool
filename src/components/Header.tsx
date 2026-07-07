import { TableFilter, Github } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <TableFilter className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">电子表格筛选工具</h1>
              <p className="text-blue-100 text-sm">批量处理多个电子表格文件</p>
            </div>
          </div>
          <a
            href="#"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
