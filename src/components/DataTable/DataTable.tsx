import React, { useState, useMemo } from 'react';
import { DataTableProps } from './DataTable.types';

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
  emptyState = 'No data available',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowSelection = (row: T) => {
    let newSelectedRows: T[];
    if (selectedRows.includes(row)) {
      newSelectedRows = selectedRows.filter((selectedRow) => selectedRow !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    if (selectable) {
      onRowSelect?.(newSelectedRows);
    }
  };

  const toggleAllRowsSelection = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      if (selectable) {
        onRowSelect?.([]);
      }
    } else {
      setSelectedRows([...data]);
      if (selectable) {
        onRowSelect?.([...data]);
      }
    }
  };

  const handleRowClick = (row: T) => {
    if (selectable) {
      toggleRowSelection(row);
    } else {
      onRowSelect?.(row);
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, row: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectable) {
        toggleRowSelection(row);
      } else {
        onRowSelect?.(row);
      }
    }
  };

  if (loading) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-2"
              role="progressbar"
              aria-label="Loading data"
            ></div>
            <span>Loading data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" aria-label="Data table">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr className="bg-gray-50 dark:bg-gray-800">
            {selectable && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedRows.length === data.length}
                  onChange={toggleAllRowsSelection}
                  aria-label="Select all rows"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                }`}
                onClick={() => column.sortable && requestSort(column.dataIndex as string)}
                aria-sort={
                  column.sortable && sortConfig?.key === column.dataIndex
                    ? sortConfig?.direction
                    : undefined
                }
              >
                <div className="flex items-center">
                  {column.title}
                  {column.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === column.dataIndex ? (
                        sortConfig?.direction === 'ascending' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-30"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center">
                <div className="flex justify-center items-center">
                  <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"
                    role="progressbar"
                    aria-label="Loading data"
                  ></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-2">📊</span>
                  {emptyState}
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  selectedRows.includes(row)
                    ? 'bg-blue-50 dark:bg-blue-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                } cursor-pointer`}
                aria-selected={selectedRows.includes(row)}
                tabIndex={0}
                onClick={() => handleRowClick(row)}
                onKeyDown={(e) => handleRowKeyDown(e, row)}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRowSelection(row)}
                      aria-label={`Select row ${rowIndex + 1}`}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;