const path = require('path');
const _    = require('lodash')
const base = require("./base")



let  devconfig  = {
  mode:"development",
}

devconfig = _.extend(base,devconfig)





module.exports = devconfig


