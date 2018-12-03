module.exports = {
  plugins: [
    'node_modules/jsdoc-vuejs',
  ],
  source: {
    include: [
      'src/components',
      'src/store',
      'src/router',
      'src/services',
      'README.md',
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
  },
};