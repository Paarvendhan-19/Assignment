export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}
export interface DataTableColumn<T> extends Column<T> {
}
export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[] | T) => void;
    className?: string;
    emptyState?: string;
}
//# sourceMappingURL=DataTable.types.d.ts.map