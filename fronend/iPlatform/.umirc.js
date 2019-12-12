
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'game_management',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
}
