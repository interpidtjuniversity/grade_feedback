const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js', // 入口文件
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/', // 确保 publicPath 是根路径
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // 匹配 JS 和 JSX 文件
                    exclude: /node_modules/, // 排除 node_modules
                    use: {
                        loader: 'babel-loader', // 使用 Babel 转译
                    },
                },
                {
                    test: /\.css$/, // 匹配 CSS 文件
                    use: ['style-loader', 'css-loader'], // 加载 CSS
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html', // 使用 public/index.html 作为模板
                filename: 'index.html', // 输出文件名
            }),
            ...(isProduction ? [
                new JavaScriptObfuscator({
                        rotateStringArray: true, // 加密字符串
                        controlFlowFlattening: true, // 控制流扁平化
                        stringArray: true,
                        stringArrayThreshold: 0.75,
                    }
                , [])] : []
            )
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        mangle: true, // 混淆变量名
                        compress: {
                            drop_console: true, // 移除 console.log
                        },
                    },
                }),
            ],
        },
        // mode: 'production', // 生产模式
        mode: 'development', // 生产模式,生产环境以dev模式启动
        devtool: 'nosources-source-map', // 禁用详细 Source Map
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'), // 静态文件目录
                publicPath: '/', // 正确的 publicPath
            },
            host: '0.0.0.0',
            port: 3000, // 自定义端口
            open: true, // 自动打开浏览器
            historyApiFallback: true, // 支持 React Router
            proxy: [
                {
                    context: ['/remote'],
                    target: 'http://8.138.173.53:8080',
                    changeOrigin: true,
                    pathRewrite: { '^/remote': '' }, // 重写路径，去除 /remote 前缀
                    logLevel: 'debug' // 开启调试日志
                }
            ]
        },
    }
};