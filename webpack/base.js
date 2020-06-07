const path = require("path")
const { cdnProfix } = require("../.nps.js");
const HappyPack = require("happypack");





const profixname = process.env.NODE_ENV = "production" ? "":"/"
const rootPath   =   path.resolve(__dirname,"../")
const prefixname = process.env.NODE_ENV = "production"?"[name].[contenthash:8]":"[name]"
const publicPath = process.env.NODE_ENV = "production"? cdnProfix :"/"

module.exports={
   entry:{
       assets:["./src/index.js"]
   },
   output:{
       filename:`Nsp_${prefixname}.js`,
       path:path.resolve(rootPath,"./build"),
       publicPath,
       chunkFilename:`${prefixname}.js`
   },
   module:{
       rules:[
           {
               test:/\.js[x]?$/,
               exclude:/node_modules/,
               include:/src|lib/,
               use: "happypack/loader?id=js"
           }
       ]
   },
   plugins:[
    new HappyPack({
        id: "js",
        threads: 5,
        loaders: ["babel-loader?cacheDirectory=true"]
      }),
   ]
   

}