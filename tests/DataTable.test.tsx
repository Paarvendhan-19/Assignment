import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import DataTable from "../src/components/DataTable/DataTable";
import type { DataTableColumn } from "../src/components/DataTable/DataTable.types";

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe("DataTable", () => {
  const testData: TestData[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  const columns: DataTableColumn<TestData>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  test("renders table with data", () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  test("shows loading state", () => {
    render(<DataTable data={[]} columns={columns} loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test("shows empty state", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders table headers correctly", () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  test("renders table data correctly", () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
  });
});
