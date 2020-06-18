import webpack from "webpack"

import KoaWebpackDevMiddleware from "../middleware/koa-webpack-dev-middleware"
import koaWebpackHotMiddleware from "../middleware/koa-webpack-hot-middleware";

const webpackClientConfig = require("../../webpack/webpack.config.dev");



export default (app,callback)=>{

    const clientCompiler = webpack(webpackClientConfig);

}