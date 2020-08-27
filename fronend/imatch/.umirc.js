
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      dll: false,
      routes: {
        exclude: [],
      },
      title: '智赛竞技平台',
      hardSource: false,
    }],
  ],

  proxy: {
    '/api': {
      // target: 'http://192.168.1.8:8069/',
      //target: 'http://192.168.1.88:8069/',
      //target: 'http://139.198.21.140:8069/',
      target:'https://139.198.21.140',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  base:'/imatch',
  publicPath:'/imatch/'
}
