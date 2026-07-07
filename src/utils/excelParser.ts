import * as XLSX from 'xlsx';
import type { SpreadsheetFile } from '@/types';

export const parseExcel = (file: File): Promise<SpreadsheetFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const headers = worksheet ? XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[] : [];
        const rows = jsonData as Record<string, any>[];
        
        resolve({
          fileName: file.name,
          filePath: file.name,
          headers: headers.filter((h): h is string => typeof h === 'string'),
          rows,
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};
