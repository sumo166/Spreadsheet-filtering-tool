import { Plus, X, Filter } from 'lucide-react';
import type { FilterCondition } from '@/types';
import { OPERATOR_OPTIONS } from '@/types';

interface FilterPanelProps {
  conditions: FilterCondition[];
  allHeaders: string[];
  onAddCondition: () => void;
  onUpdateCondition: (id: string, updates: Partial<FilterCondition>) => void;
  onRemoveCondition: (id: string) => void;
}

export const FilterPanel = ({
  conditions,
  allHeaders,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
}: FilterPanelProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          筛选条件
        </h2>
        <button
          onClick={onAddCondition}
          disabled={allHeaders.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          添加条件
        </button>
      </div>

      {allHeaders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">请先上传文件</p>
      ) : conditions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          点击上方按钮添加筛选条件<br />
          <span className="text-sm">不设置条件将显示所有数据</span>
        </p>
      ) : (
        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <div
              key={condition.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              {index > 0 && (
                <div className="flex items-center gap-2">
                  <select
                    value={condition.logic}
                    onChange={(e) =>
                      onUpdateCondition(condition.id, { logic: e.target.value as 'AND' | 'OR' })
                    }
                    className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                </div>
              )}
              
              <select
                value={condition.columnName}
                onChange={(e) =>
                  onUpdateCondition(condition.id, { columnName: e.target.value })
                }
                className="flex-1 min-w-[150px] px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {allHeaders.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>

              <select
                value={condition.operator}
                onChange={(e) =>
                  onUpdateCondition(condition.id, { operator: e.target.value as FilterCondition['operator'] })
                }
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {OPERATOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={condition.value}
                onChange={(e) =>
                  onUpdateCondition(condition.id, { value: e.target.value })
                }
                placeholder="输入筛选值"
                className="flex-1 min-w-[150px] px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <button
                onClick={() => onRemoveCondition(condition.id)}
                className="p-1.5 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
