import Papa from 'papaparse';
import type { SpreadsheetFile } from '@/types';

export const parseCSV = (file: File): Promise<SpreadsheetFile> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, any>[];
        resolve({
          fileName: file.name,
          filePath: file.name,
          headers,
          rows,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const exportToCSV = (headers: string[], data: Record<string, any>[], fileName: string): void => {
  const csv = Papa.unparse({
    fields: headers,
    data,
  });
  
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
