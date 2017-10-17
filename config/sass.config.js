module.exports = {
  outputFilename: process.env.IONIC_OUTPUT_CSS_FILE_NAME,
  sourceMap: false,
  outputStyle: 'expanded',
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'iOS >= 8',
      'Android >= 4.4',
      'Explorer >= 11',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },
  includePaths: [
    'node_modules/ionic-angular/themes',
    'node_modules/ionicons/dist/scss',
    'node_modules/ionic-angular/fonts',
    'node_modules/font-awesome/scss'
  ],
  includeFiles: [
    /\.(s(c|a)ss)$/i
  ],
  excludeFiles: [
    /*  /\.(wp).(scss)$/i  */
  ],
  variableSassFiles: [
    '{{SRC}}/theme/variables.scss'
  ],
  directoryMaps: {
    '{{TMP}}': '{{SRC}}'
  },
  excludeModules: [
    '@angular',
    'commonjs-proxy',
    'core-js',
    'ionic-native',
    'rxjs',
    'zone.js'
  ]
};