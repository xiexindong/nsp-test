import Koa from "koa"
import {join,resolve} from "lodash"
import chokidar from "chokidar";


// add 新增文件时触发
// addDir 新增文件夹的时候触发
// unlink 对应的文件删除
// unlinkDir 对应的文件夹删除
// change  文件内容改变时
// all 指代以上所有事件，(除了 ready,raw, and error 之外的所有类型事件)

// callback(path,event)=> path 指代监听的路径
class App{
    constructor(middlewares,port){
        console.log(111,this,this)
        this.app = new Koa();
        this.isListen = false;
        this.middlewares = middlewares;
        this.port = port
    }
    runDevTodo(){
        
    
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
                this.runDevTodo()
            }
        })
    }
}

module.exports = App