// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'imatch',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],


  proxy: {
    '/api': {
      target: 'http://192.168.0.110:8069/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

}
