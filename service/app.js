import Koa from "koa"
import {join,resolve} from "lodash"
import chokidar from "chokidar";




class App{
    constructor(){
        this.app = new Koa()
    }
    runDev(){
        const watcher = chokidar.watch(join(__dirname,"../src/page"),{
            ignored: /(^|[\/\\])\../,
            persistent: true
        })
    }
}