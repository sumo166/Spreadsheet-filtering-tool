import { FileDown, Table, Download } from 'lucide-react';
import { exportToCSV } from '@/utils/csvParser';

interface ResultTableProps {
  headers: string[];
  data: Record<string, any>[];
  count: number;
}

export const ResultTable = ({ headers, data, count }: ResultTableProps) => {
  const handleExport = () => {
    if (data.length > 0) {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      exportToCSV(headers, data, `筛选结果_${timestamp}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Table className="w-5 h-5 text-blue-600" />
          筛选结果
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            共 <span className="font-semibold text-blue-600">{count}</span> 条记录
          </span>
          <button
            onClick={handleExport}
            disabled={data.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            导出CSV
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="p-6 bg-gray-100 rounded-full mb-4">
            <FileDown className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500">暂无数据</p>
          <p className="text-sm text-gray-400 mt-1">请上传文件并设置筛选条件</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-blue-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-3 text-sm text-gray-600"
                    >
                      {String(row[header] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
