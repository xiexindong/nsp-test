const filename = "NODE_EVN" in process.env && process.env.NOde_EVM.includes("production")
? "production"
: "development";

module.exports = require(`./${filename}.js`);


