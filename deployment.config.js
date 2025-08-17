// Production Deployment Configuration
module.exports = {
  // Build settings
  build: {
    target: 'es2020',
    minify: true,
    sourcemap: true,
    treeshake: true,
    external: ['react', 'react-dom'],
  },

  // Bundle analysis
  bundleAnalyzer: {
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: false,
    generateStatsFile: true,
  },

  // Performance budgets
  performance: {
    maxAssetSize: 250000, // 250KB
    maxEntrypointSize: 250000, // 250KB
    hints: 'warning',
  },

  // Deployment targets
  targets: {
    npm: {
      registry: 'https://registry.npmjs.org/',
      access: 'public',
    },
    cdn: {
      provider: 'jsdelivr',
      url: 'https://cdn.jsdelivr.net/npm/frontend-components-library@latest/',
    },
    github: {
      pages: true,
      storybook: true,
      branch: 'gh-pages',
    },
  },

  // Environment variables for production
  env: {
    NODE_ENV: 'production',
    BUILD_TARGET: 'production',
    GENERATE_SOURCEMAP: 'true',
  },

  // Quality gates
  qualityGates: {
    testCoverage: 100,
    linting: true,
    typeChecking: true,
    bundleSize: true,
  },
};
