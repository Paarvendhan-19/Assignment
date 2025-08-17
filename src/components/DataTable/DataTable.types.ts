export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableColumn<T> extends Column<T> {}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  // eslint-disable-next-line no-unused-vars
  onRowSelect?: (selectedRows: T[] | T) => void;
  className?: string;
  emptyState?: string;
}