import { Header } from '@/components/Header';
import { FileUploader } from '@/components/FileUploader';
import { ColumnSelector } from '@/components/ColumnSelector';
import { FilterPanel } from '@/components/FilterPanel';
import { ResultTable } from '@/components/ResultTable';
import { useSpreadsheetFilter } from '@/hooks/useSpreadsheetFilter';

function App() {
  const {
    files,
    conditions,
    selectedColumns,
    allHeaders,
    filteredResultsCount,
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
  } = useSpreadsheetFilter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <FileUploader
              files={files}
              isLoading={isLoading}
              error={error}
              onAddFiles={addFiles}
              onRemoveFile={removeFile}
              onClearFiles={clearFiles}
            />
            
            <ColumnSelector
              allHeaders={allHeaders}
              selectedColumns={selectedColumns}
              onToggleColumn={toggleColumn}
              onSelectAll={selectAllColumns}
              onClearAll={clearSelectedColumns}
            />
            
            <FilterPanel
              conditions={conditions}
              allHeaders={allHeaders}
              onAddCondition={addCondition}
              onUpdateCondition={updateCondition}
              onRemoveCondition={removeCondition}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ResultTable
              headers={getResultHeaders}
              data={getFormattedResults}
              count={filteredResultsCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
