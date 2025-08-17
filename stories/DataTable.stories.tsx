import { Meta, StoryObj } from '@storybook/react';
import DataTable from '../src/components/DataTable/DataTable';
import { Column } from '../src/components/DataTable/DataTable.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<User>>;

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
];

export const Basic: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const Selectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};