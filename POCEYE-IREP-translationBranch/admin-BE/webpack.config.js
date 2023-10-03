import path from 'path';

module.exports = {
    entry: "./index.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}