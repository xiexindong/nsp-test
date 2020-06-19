const webpack = require('webpack');
const _    = require('lodash')
const base = require("./base");






let  devconfig  = {
  mode:"development",
}

devconfig = _.extend(base,devconfig);

devconfig.entry.assets.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=0&reload=true&quiet=true")

devconfig.mode = "development";

devconfig.plugins.push(new webpack.HotModuleReplacementPlugin())





module.exports = devconfig


