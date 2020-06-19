import Koa from "koa"
// import {join,resolve} from "lodash"
import {path, resolve } from "path"
import R from "ramda";
import chalk from "chalk"
import chokidar from "chokidar";
import RouterAnalyze from "@lib/analyze"
const entry = resolve(__dirname,"../src/page")
const output = resolve(__dirname,"../src/.nsp/router.js")


// add 新增文件时触发
// addDir 新增文件夹的时候触发
// unlink 对应的文件删除
// unlinkDir 对应的文件夹删除
// change  文件内容改变时
// all 指代以上所有事件，(除了 ready,raw, and error 之外的所有类型事件)

// callback(path,event)=> path 指代监听的路径
class App{
    constructor(middlewares,port){
        this.app = new Koa();
        this.isListen  = false;
        this.middlewares = middlewares;
        this.port = port
    }
    createHttpServer(){

    }
    runDevTodo(){
        new RouterAnalyze(entry,output,()=>{
            if(!this.isListen){
                dev(this.app,()=>{
                    !this.isListen && this.createHttpServer();
                })
            }
        })
        
    }
    runDev(){
        const watcher = chokidar.watch(join(__dirname,"../src/page"),{
            ignored: /(^|[\/\\])\../,// 忽略点文件
            persistent: true //与原生fs.watch一样,表示是否保护进程不退出持久监听，默认值为true
        })
        watcher.on("all",event=>{
            if(this.isListen && (
                event.includes("add")||
                event.includes("unlink")||
                event.includes("addDir")||
                event.includes("unlinkDir")
            )){
                this.runDevTodo();
            }
        })
        watcher.on("ready",()=>{
            console.log(chalk.green("Initial watcher complete,Ready for changes"));
            this.runDevTodo();
        })

        
    }
}

module.exports = App