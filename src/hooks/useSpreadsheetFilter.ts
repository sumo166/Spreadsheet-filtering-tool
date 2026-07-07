import { useState, useCallback, useMemo } from 'react';
import type { SpreadsheetFile, FilterCondition, FilterResult } from '@/types';
import { parseCSV } from '@/utils/csvParser';
import { parseExcel } from '@/utils/excelParser';
import { applyFilters, getAllHeaders } from '@/utils/filterEngine';

export const useSpreadsheetFilter = () => {
  const [files, setFiles] = useState<SpreadsheetFile[]>([]);
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allHeaders = useMemo(() => getAllHeaders(files), [files]);

  const filteredResults = useMemo(() => {
    return applyFilters(files, conditions);
  }, [files, conditions]);

  const addFiles = useCallback(async (newFiles: File[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const parsedFiles: SpreadsheetFile[] = await Promise.all(
        newFiles.map(async (file) => {
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          
          if (fileExtension === 'csv') {
            return parseCSV(file);
          } else if (['xlsx', 'xls'].includes(fileExtension || '')) {
            return parseExcel(file);
          } else {
            throw new Error(`不支持的文件格式: ${file.name}`);
          }
        })
      );
      
      setFiles((prev) => [...prev, ...parsedFiles]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '文件解析失败');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFile = useCallback((fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.fileName !== fileName));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setConditions([]);
    setSelectedColumns([]);
  }, []);

  const addCondition = useCallback(() => {
    const newCondition: FilterCondition = {
      id: `condition-${Date.now()}`,
      columnName: allHeaders[0] || '',
      operator: 'contains',
      value: '',
      logic: conditions.length > 0 ? 'AND' : 'AND',
    };
    setConditions((prev) => [...prev, newCondition]);
  }, [allHeaders, conditions.length]);

  const updateCondition = useCallback((id: string, updates: Partial<FilterCondition>) => {
    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const removeCondition = useCallback((id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleColumn = useCallback((column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  }, []);

  const selectAllColumns = useCallback(() => {
    setSelectedColumns(allHeaders);
  }, [allHeaders]);

  const clearSelectedColumns = useCallback(() => {
    setSelectedColumns([]);
  }, []);

  const getResultHeaders = useMemo(() => {
    const sourceHeader = ['来源文件'];
    const columns = selectedColumns.length > 0 ? selectedColumns : allHeaders;
    return [...sourceHeader, ...columns];
  }, [selectedColumns, allHeaders]);

  const getFormattedResults = useMemo(() => {
    return filteredResults.map((result) => {
      const formatted: Record<string, any> = {
        '来源文件': result.sourceFile,
      };
      
      const columns = selectedColumns.length > 0 ? selectedColumns : allHeaders;
      columns.forEach((col) => {
        formatted[col] = result.rowData[col] ?? '';
      });
      
      return formatted;
    });
  }, [filteredResults, selectedColumns, allHeaders]);

  return {
    files,
    conditions,
    selectedColumns,
    allHeaders,
    filteredResults,
    filteredResultsCount: filteredResults.length,
    isLoading,
    error,
    getResultHeaders,
    getFormattedResults,
    addFiles,
    removeFile,
    clearFiles,
    addCondition,
    updateCondition,
    removeCondition,
    toggleColumn,
    selectAllColumns,
    clearSelectedColumns,
  };
};
