const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false
})


module.exports = {
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "Opensquare";
              return args;
          },options => {
            options['compilerOptions'] = {
              ...options.compilerOptions || {},
              isCustomElement: tag => tag.startsWith('amplify-')
            }
            return options;
          })
  }
}