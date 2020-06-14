import fs from "fs";
import chalk from "chalk";
import path from "path";
import {pageIgnore} from "../.nps.js"

class RouterAnalyze{
    constructor(entry){
        this.entry = entry;
        this.isRight = true;
        this.jsRouterLinks = [];
        this.init();
    }
    init(){
        this.compileDir(this.entry,"")
    }
    compileDir(entry,prefix){
        let {code,files} = this.isHasDir(entry)
        console.log("22",files)
        files = files.filter(function(item){
            return item.endsWith(".js")
        })
        console.log("33",files)
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