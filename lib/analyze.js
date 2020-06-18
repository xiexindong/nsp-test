import fs from "fs";
import chalk from "chalk";
import path from "path";


import {pageIgnore} from "../.nps.js"

class RouterAnalyze{
    constructor(entry,output,callback){
        this.entry = entry;
        this.output = output;
        this.callback = callback || null;
        this.isRight = true;
        this.jsRouterLinks = [];
        this.init();
    }
    init(){
        this.compileDir(this.entry,"")
        if(this.isRight){
            const strings = this.writeTemplate(this.jsRouterLinks)
            this.writeFile(output,strings,)
        }else{
            console.log("编译文件错误")
        }
    }
    //生成需要页面内容
    writeTemplate(jsRouterLinks){
        let str = 
        'import React ,{Fragment}from "react";\n'+
        'import {Route} from "react-router-dom"\n'+
        'import Loadable from "nsploadable"\n\n';

        let routerStr  = "const routes = [\n";

        jsRouterLinks.forEach(item =>{
            const componentName = `Nsp${item.replace(/\//g, "_")}`;
            const pathName = `../page${item}`;
            str += this.templateLoadable(componentName,pathName)+'\n\n';
            routerStr += this.templateRoutes(componentName,pathName);
        });
    
        return str + routerStr + "] \n\n" + this.templateApp()
    }
    templateLoadable(componentName, path) {
        return (
          `const ${componentName} = Loadable({\n` +
          `  loader: () => import(/* webpackChunkName: '${componentName}' */ '${path}')\n` +
          `});`
        );
      }

    templateRoutes(componentName, path) {
        return (
          "  {\n" +
          `    path: "${path}",\n` +
          `    component: <${componentName} />\n` +
          `  },\n`
        );
      }

      templateApp() {
        return (
          "class App extends React.Component {\n" +
          "  render () {\n" +
          "    return (\n" +
          "      <Fragment>\n" +
          "        {routes.map(item => (\n" +
          "          <Route path={item.path} exact key={item.path}>\n" +
          "            {item.component}\n" +
          "          </Route>\n" +
          "        ))}\n" +
          "      </Fragment>\n" +
          "    );\n" +
          "  }\n" +
          "}\n\n" +
          "export default App;"
        );
      }


    compileDir(entry,prefix){
        let {code,files} = this.isHasDir(entry)

        files = files.filter(item => item.endsWith(".js") || !item.includes("."));
       

        //有文件
        if(code){
            if(files.length > 0){
                for(let item of files){
                    // 判断是否重复
                    for(let _item of files){
                        if (item !== _item && item.includes(_item)) { //这一点不懂
                            console.log(
                                chalk.red(
                                    `x${entry}的${item}和${_item} 重命名，请删除其中之一`
                                )
                            )
                            this.isRight = false
                        }
                    }

                    //没有重复
                    //以index.js 结尾的文件
                  
                    if(item.endsWith("index.js")){
                        this.jsRouterLinks.push(prefix == "" ? "/": prefix)
                    }else if(item.endsWith(".js")){
                        this.jsRouterLinks.push(prefix + `/${item.replace(".js","")}`)
                    }else if(item){
                        // 这个地方有点问题
                        const nextPath = path.join(entry, `/${item}`);
                        this.compileDir(nextPath, prefix + `/${item}`);
                    }
                }
            }else{
                 // 没有文件
                console.log(chalk.yellow(`- ${entry}文件夹没有文件~`));
            }
        }else{
            console.log(chalk.yellow(`-${entry}文件夹下面没有文件`))
            this.isRight = false;
        }
       

    }
    //书写内容
    writeFile(output,content,callback){
        let result = "";
        try{
            result = fs.readFileSync(output,"utf-8");
        }catch(e){
            fs.mkdirSync("src/.nsp")
        }

        if(result == content){
            console.log(chalk.green("文件不需要跟新"))
            callback&&callback()
        }else{
            fs.writeFile(output,content,err=>{
                console.log(chalk.green("文件已经生成"))
                callback&&callback()
            })
            if(err){
                console.log(chalk.red("文件成成失败"))
                throw err
            }
        }



    }

    isHasDir(inPath){
        try{
            const files = fs.readdirSync(inPath,'utf8');
            return{ code : true, files }
        }catch(e){
            return{ code :false, files:[] }
        }
       
    }
}

export default RouterAnalyze