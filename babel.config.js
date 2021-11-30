const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push("transform-remove-console")   // 生产环境下移除所有的console
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // "plugins": [
  //   [
  //     "component",
  //     {
  //       "libraryName": "element-ui",
  //       "styleLibraryName": "theme-chalk"
  //     }
  //   ]
  // ]
  plugins: [
    ...prodPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
