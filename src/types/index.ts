export interface SpreadsheetFile {
  fileName: string;
  filePath: string;
  headers: string[];
  rows: Record<string, any>[];
}

export interface FilterCondition {
  id: string;
  columnName: string;
  operator: 'equals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'startsWith' | 'endsWith';
  value: string;
  logic: 'AND' | 'OR';
}

export interface FilterResult {
  sourceFile: string;
  rowData: Record<string, any>;
}

export type OperatorOption = {
  value: FilterCondition['operator'];
  label: string;
};

export const OPERATOR_OPTIONS: OperatorOption[] = [
  { value: 'equals', label: '等于' },
  { value: 'contains', label: '包含' },
  { value: 'notContains', label: '不包含' },
  { value: 'greaterThan', label: '大于' },
  { value: 'lessThan', label: '小于' },
  { value: 'startsWith', label: '开头是' },
  { value: 'endsWith', label: '结尾是' },
];
