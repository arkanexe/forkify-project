const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

try {
  fs.rmSync(distPath, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 200,
  });
} catch (error) {
  console.error('Could not clean the dist folder before building.');
  console.error(
    'Close any running Parcel dev server or any editor preview using dist, then run the build again.'
  );
  console.error(error.message);
  process.exit(1);
}
