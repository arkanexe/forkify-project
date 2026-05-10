const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const sourceIconsPath = path.join(rootDir, 'src', 'img', 'icons.svg');

try {
  const sourceIcons = fs.readFileSync(sourceIconsPath, 'utf8');
  const distFiles = fs.readdirSync(distDir);
  const iconBundles = distFiles.filter(
    file => /^icons\..+\.svg$/.test(file) || file === 'icons.svg'
  );

  if (iconBundles.length === 0) {
    console.warn('No built icon sprite was found in dist.');
    process.exit(0);
  }

  iconBundles.forEach(file => {
    fs.writeFileSync(path.join(distDir, file), sourceIcons, 'utf8');
  });
} catch (error) {
  console.error('Could not repair the built icon sprite.');
  console.error(error.message);
  process.exit(1);
}
