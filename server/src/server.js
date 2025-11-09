// Server entry point - starts the Express application
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📝 Practice endpoints:');
    console.log('  GET    /api/status');
    console.log('  GET    /api/users');
    console.log('  POST   /api/users');
    console.log('  GET    /api/products');
    console.log('  POST   /api/products');
    console.log('\n💡 Frontend running on http://localhost:5173');
});