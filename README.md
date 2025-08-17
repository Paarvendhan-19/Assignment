# Frontend Components Library

A production-ready React component library built with TypeScript and Tailwind CSS. This library provides a set of reusable, accessible, and customizable UI components for building modern web applications.

## 🚀 Features

- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Tailwind CSS**: Built with Tailwind CSS for consistent styling and easy customization
- **Accessibility**: WCAG compliant components with proper ARIA attributes
- **Responsive Design**: Mobile-first responsive components
- **Production Ready**: Optimized bundle with tree-shaking support
- **Testing**: Comprehensive test coverage with Vitest
- **Storybook**: Interactive component documentation and testing

## 📦 Installation

```bash
npm install frontend-components-library
```

## 🔧 Usage

### Basic Import

```tsx
import { DataTable, InputField, Loading, ErrorBoundary } from 'frontend-components-library';
```

### DataTable Component

A flexible data table component with sorting, loading states, and empty states.

```tsx
import { DataTable } from 'frontend-components-library';

const data = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
];

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
];

function MyComponent() {
  return (
    <DataTable
      data={data}
      columns={columns}
      loading={false}
      emptyState="No data available"
      onRowSelect={(row) => console.log('Selected:', row)}
    />
  );
}
```

### InputField Component

A versatile input component with multiple variants, validation states, and loading indicators.

```tsx
import { InputField } from 'frontend-components-library';

function MyForm() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      value={value}
      onChange={setValue}
      helperText="We'll never share your email"
      variant="filled"
      size="md"
      required
    />
  );
}
```

### Loading Component

Multiple loading indicators with different variants and sizes.

```tsx
import { Loading } from 'frontend-components-library';

function MyComponent() {
  return (
    <div>
      <Loading variant="spinner" size="lg" text="Loading..." />
      <Loading variant="dots" size="md" />
      <Loading variant="skeleton" size="sm" />
    </div>
  );
}
```

### ErrorBoundary Component

Error boundary component for graceful error handling.

```tsx
import { ErrorBoundary } from 'frontend-components-library';

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong!</div>}
      onError={(error, errorInfo) => {
        console.error('Error caught:', error, errorInfo);
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

## 🎨 Component Variants

### InputField Variants
- `filled` - Default filled background
- `outlined` - Outlined with white background
- `ghost` - Transparent background

### InputField Sizes
- `sm` - Small (px-3 py-1.5 text-sm)
- `md` - Medium (px-3 py-2 text-base)
- `lg` - Large (px-4 py-3 text-lg)

### Loading Variants
- `spinner` - Circular spinning loader
- `dots` - Animated dots
- `skeleton` - Skeleton loading animation

### Loading Sizes
- `sm` - Small (w-4 h-4)
- `md` - Medium (w-8 h-8)
- `lg` - Large (w-12 h-12)

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run tests with UI:

```bash
npm run test:ui
```

## 📚 Storybook

Start Storybook for interactive component documentation:

```bash
npm start
```

Build Storybook for production:

```bash
npm run storybook:build
```

## 🏗️ Development

### Building the Library

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Build the library with Rollup
3. Generate CommonJS and ES modules
4. Create type definitions

### Development Scripts

- `npm run build:ts` - TypeScript type checking
- `npm run build:lib` - Build library with Rollup
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

## 📦 Bundle Analysis

Analyze the bundle size:

```bash
npm run bundle-size
```

## 🚀 Deployment

Deploy Storybook to GitHub Pages:

```bash
npm run deploy:storybook
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── DataTable/      # Data table component
│   ├── InputField/     # Input field component
│   ├── Loading/        # Loading indicators
│   └── ErrorBoundary/  # Error boundary
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Constants and configuration
└── styles/             # Global styles and Tailwind CSS
```

## 🎯 Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Check the Storybook documentation
- Review the component examples

## 🔄 Changelog

### 1.0.0
- Initial release
- DataTable component with sorting and loading states
- InputField component with multiple variants
- Loading component with different animations
- ErrorBoundary component for error handling
- Full TypeScript support
- Tailwind CSS integration
- Comprehensive testing setup
- Storybook documentation
