import { CheckSquare, Square, Check } from 'lucide-react';

interface ColumnSelectorProps {
  allHeaders: string[];
  selectedColumns: string[];
  onToggleColumn: (column: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const ColumnSelector = ({
  allHeaders,
  selectedColumns,
  onToggleColumn,
  onSelectAll,
  onClearAll,
}: ColumnSelectorProps) => {
  const isAllSelected = allHeaders.length > 0 && selectedColumns.length === allHeaders.length;
  const isPartiallySelected = selectedColumns.length > 0 && !isAllSelected;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          选择列
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            全选
          </button>
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-600 font-medium"
          >
            清空
          </button>
        </div>
      </div>

      {allHeaders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">请先上传文件</p>
      ) : (
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2">
          {allHeaders.map((column) => (
            <button
              key={column}
              onClick={() => onToggleColumn(column)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${selectedColumns.includes(column)
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                }
              `}
            >
              {selectedColumns.includes(column) ? (
                <Check className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              {column}
            </button>
          ))}
        </div>
      )}

      {selectedColumns.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            已选择 <span className="font-semibold text-blue-600">{selectedColumns.length}</span> 列
          </p>
        </div>
      )}
    </div>
  );
};
