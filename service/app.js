import Koa from "koa"
import Loadable from "nsploadable";
import {resolve,join} from "path"
import R from "ramda";
import chalk from "chalk"
import chokidar from "chokidar";
import RouterAnalyze from "@lib/analyze"
import dev from "./utils/dev"
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
    useMiddleware(){
        const joinPathName = moduleName =>{
            return join(__dirname,`./middleware_app/${moduleName}`);
          }
          
      
          const requirePath = pathName => require(pathName);
      
          const useMiddleware = R.forEachObjIndexed(middlewaresUseByApp =>{
            return middlewaresUseByApp(this.app)
            }
          );
          
        
          const Rcompose = R.compose(useMiddleware,(item)=>{
            console.log("this.app",this.app);
            console.log("item",item)
            return item
        }, requirePath,joinPathName);
      
          R.map(Rcompose)(this.middlewares);
    }
    createHttpServer(){
        this.useMiddleware();
        Loadable.preloadAll().then(() => {
            this.app.listen(this.port, err => {
              console.log(
                chalk.green(
                  `Nsp is Listening on port ${this.port}. Open up http://localhost:${this.port}/ in your browser.\n`
                )
              );
              this.isListen = true;
            });
          });
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