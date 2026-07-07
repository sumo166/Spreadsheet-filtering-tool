import { useCallback, useRef } from 'react';
import { Upload, FileText, X, FolderOpen } from 'lucide-react';
import type { SpreadsheetFile } from '@/types';

interface FileUploaderProps {
  files: SpreadsheetFile[];
  isLoading: boolean;
  error: string | null;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (fileName: string) => void;
  onClearFiles: () => void;
}

export const FileUploader = ({
  files,
  isLoading,
  error,
  onAddFiles,
  onRemoveFile,
  onClearFiles,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'csv' || ext === 'xlsx' || ext === 'xls';
      });
      if (droppedFiles.length > 0) {
        onAddFiles(droppedFiles);
      }
    },
    [onAddFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onAddFiles(selectedFiles);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onAddFiles]
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          选择文件
        </h2>
        {files.length > 0 && (
          <button
            onClick={onClearFiles}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            清空所有文件
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${files.length === 0 
            ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50' 
            : 'border-gray-200 bg-gray-50'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className={`p-4 rounded-full ${files.length === 0 ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Upload className={`w-8 h-8 ${files.length === 0 ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          <div>
            <p className={`font-medium ${files.length === 0 ? 'text-gray-700' : 'text-gray-500'}`}>
              {files.length === 0 ? '拖拽文件到此处' : '点击或拖拽添加更多文件'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              支持 CSV、XLSX、XLS 格式
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            <FolderOpen className="w-4 h-4" />
            选择文件
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">已选择 {files.length} 个文件:</p>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.fileName}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700 text-sm">{file.fileName}</p>
                    <p className="text-xs text-gray-400">{file.rows.length} 行数据</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(file.fileName)}
                  className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
