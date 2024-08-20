/* webpack.config.js */
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Correctly reference the dist folder
    filename: 'bundle.js',
  },
};
