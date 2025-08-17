#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production deployment process...\n');

// Step 1: Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
  console.log('✅ Clean completed\n');
} catch (error) {
  console.error('❌ Clean failed:', error.message);
  process.exit(1);
}

// Step 2: Run quality checks
console.log('🔍 Running quality checks...');
try {
  console.log('  - Type checking...');
  execSync('npm run type-check', { stdio: 'inherit' });
  
  console.log('  - Linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  console.log('  - Testing...');
  execSync('npm test -- --run', { stdio: 'inherit' });
  
  console.log('✅ Quality checks passed\n');
} catch (error) {
  console.error('❌ Quality checks failed:', error.message);
  process.exit(1);
}

// Step 3: Build production bundle
console.log('📦 Building production bundle...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Production build completed\n');
} catch (error) {
  console.error('❌ Production build failed:', error.message);
  process.exit(1);
}

// Step 4: Build Documentation (skip Storybook for now)
console.log('📚 Skipping Storybook documentation (not installed)...');
console.log('✅ Documentation step completed\n');

// Step 5: Verify build outputs
console.log('🔍 Verifying build outputs...');
const requiredFiles = [
  'dist/index.js',
  'dist/index.esm.js',
  'dist/index.d.ts'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - Missing!`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Some required files are missing!');
  process.exit(1);
}

// Step 6: Display bundle information
console.log('\n📊 Bundle Information:');
try {
  const stats = fs.statSync('dist/index.js');
  const statsEsm = fs.statSync('dist/index.esm.js');
  
  console.log(`  - CommonJS bundle: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`  - ESM bundle: ${(statsEsm.size / 1024).toFixed(2)} KB`);
} catch (error) {
  console.log('  - Could not read bundle sizes');
}

console.log('\n🎉 Production deployment preparation completed successfully!');
console.log('\n📋 Next steps:');
console.log('  1. Review the built files in the dist/ directory');
console.log('  2. Test the components in your application');
console.log('  3. Publish to npm: npm publish');
console.log('  4. Set up Storybook for documentation (optional)');
console.log('\n✨ Your component library is ready for production! ✨');
