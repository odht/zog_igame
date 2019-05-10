var path = require('path')
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: true,按需加载
      title: '智赛竞技平台',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
          /assets/,
          /odoo/,
        ],
      },
    }],
  ],
  // history:'hash',哈希路由将导致state不可用
  base: '/itable',
  publicPath: '/itable/',
  chainWebpack(config, { webpack }) {
    // console.log(config);
    config.merge({
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: ['ts-loader'],
            exclude: [
              path.resolve(__dirname, 'node_modules')
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            resolve: {
              extensions: ['', '.ts', '.tsx']
            }
          }
        })
      ]
    })
  }
}
