module.exports = {
  plugins: [
    '../',
    'plugins/markdown',
    "node_modules/jsdoc-vuejs"
  ],
  source: {
    include: [
      'src/services',
      'src/components',
      'src/router',
      'src/store'
      'README.md'
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
  },
};