import type { FilterCondition, FilterResult, SpreadsheetFile } from '@/types';

const compareValues = (value: any, operator: FilterCondition['operator'], filterValue: string): boolean => {
  const stringValue = String(value ?? '').toLowerCase();
  const stringFilterValue = filterValue.toLowerCase();
  
  switch (operator) {
    case 'equals':
      return stringValue === stringFilterValue;
    case 'contains':
      return stringValue.includes(stringFilterValue);
    case 'notContains':
      return !stringValue.includes(stringFilterValue);
    case 'greaterThan':
      return Number(value) > Number(filterValue);
    case 'lessThan':
      return Number(value) < Number(filterValue);
    case 'startsWith':
      return stringValue.startsWith(stringFilterValue);
    case 'endsWith':
      return stringValue.endsWith(stringFilterValue);
    default:
      return true;
  }
};

const rowMatchesConditions = (row: Record<string, any>, conditions: FilterCondition[]): boolean => {
  if (conditions.length === 0) return true;
  
  return conditions.reduce((result, condition, index) => {
    const matches = compareValues(row[condition.columnName], condition.operator, condition.value);
    
    if (index === 0) {
      return matches;
    }
    
    const logic = condition.logic;
    if (logic === 'AND') {
      return result && matches;
    } else {
      return result || matches;
    }
  }, true);
};

export const applyFilters = (
  files: SpreadsheetFile[],
  conditions: FilterCondition[]
): FilterResult[] => {
  const results: FilterResult[] = [];
  
  files.forEach((file) => {
    file.rows.forEach((row) => {
      if (rowMatchesConditions(row, conditions)) {
        results.push({
          sourceFile: file.fileName,
          rowData: row,
        });
      }
    });
  });
  
  return results;
};

export const getAllHeaders = (files: SpreadsheetFile[]): string[] => {
  const headerSet = new Set<string>();
  
  files.forEach((file) => {
    file.headers.forEach((header) => {
      headerSet.add(header);
    });
  });
  
  return Array.from(headerSet);
};
