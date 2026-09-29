import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`  Amore & Co. Boutique API Server Running!`);
  console.log(`  Local URL: http://localhost:${PORT}/api/health`);
  console.log(`  Port:      ${PORT}`);
  console.log(`  Env:       ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================================');
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down Amore & Co. Boutique Server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nGracefully terminating Amore & Co. Boutique Server...');
  server.close(() => {
    console.log('Server terminated.');
    process.exit(0);
  });
});
