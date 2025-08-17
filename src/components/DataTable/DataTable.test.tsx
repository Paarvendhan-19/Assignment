import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from './DataTable';
import type { DataTableColumn } from './DataTable.types';

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

describe('DataTable', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'Alice Johnson', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', age: 35, email: 'charlie@example.com' },
  ];

  const columns: DataTableColumn<TestData>[] = [
    { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  ];

  it('renders table with data correctly', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(<DataTable data={[]} columns={columns} loading={true} />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('shows empty state correctly', () => {
    const customEmptyState = 'No records found';
    render(<DataTable data={[]} columns={columns} emptyState={customEmptyState} />);
    
    expect(screen.getByText(customEmptyState)).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('sorts data when column header is clicked', async () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Check if data is sorted alphabetically (Alice should be first)
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Alice Johnson');
    });
    
    // Click again to reverse sort
    fireEvent.click(nameHeader);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Charlie Brown');
    });
  });

  it('calls onRowSelect when row is clicked', () => {
    const mockOnRowSelect = vi.fn();
    render(<DataTable data={mockData} columns={columns} onRowSelect={mockOnRowSelect} />);
    
    const firstRow = screen.getByText('Alice Johnson').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(mockOnRowSelect).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles keyboard navigation for row selection', () => {
    const mockOnRowSelect = vi.fn();
    render(<DataTable data={mockData} columns={columns} onRowSelect={mockOnRowSelect} />);
    
    const firstRow = screen.getByText('Alice Johnson').closest('tr');
    fireEvent.keyDown(firstRow!, { key: 'Enter' });
    
    expect(mockOnRowSelect).toHaveBeenCalledWith(mockData[0]);
  });

  it('handles keyboard navigation for sorting', async () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.keyDown(nameHeader, { key: 'Enter' });
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('Alice Johnson');
    });
  });

  it('applies proper ARIA attributes', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Data table');
    
    const headers = screen.getAllByRole('columnheader');
    headers.forEach(header => {
      expect(header).toHaveAttribute('scope', 'col');
    });
  });

  it('handles non-sortable columns correctly', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const emailHeader = screen.getByText('Email');
    expect(emailHeader).not.toHaveAttribute('tabIndex');
    expect(emailHeader).not.toHaveAttribute('aria-sort');
  });

  it('applies proper CSS classes for different states', () => {
    render(<DataTable data={mockData} columns={columns} />);
    
    const table = screen.getByRole('table');
    expect(table).toHaveClass('min-w-full', 'divide-y');
    
    const headerRow = screen.getAllByRole('row')[0];
    expect(headerRow).toHaveClass('bg-gray-50');
  });
}); 