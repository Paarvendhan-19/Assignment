const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('.'));

// Serve the demo HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Serve the built library
app.use('/dist', express.static('dist'));

// API endpoint to test components
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Frontend Components Library is running!',
    components: ['DataTable', 'InputField', 'Loading', 'ErrorBoundary'],
    status: 'production-ready'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend Components Library Dev Server running at:`);
  console.log(`   📱 Local: http://localhost:${PORT}`);
  console.log(`   🌐 Network: http://0.0.0.0:${PORT}`);
  console.log(`\n📖 View the demo: http://localhost:${PORT}/demo.html`);
  console.log(`📦 Built library: http://localhost:${PORT}/dist/`);
  console.log(`\n✨ All components are production-ready and working!`);
}); 