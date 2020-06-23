import { resolve } from "path";
import KoaRouter from "koa-router";
import glob from "glob";
import R from "ramda";

const pathPrefix = Symbol("pathPrefix");
const routeMap = [];

export class Route {
    constructor(app,routesPath){
        this.app = app;
        this.router =new KoaRouter();
        this.routesPath = routesPath;
    }

    init = () => {
        const { app, router, routesPath } = this;
        glob.sync(resolve(routesPath, "./*.js")).forEach(require);
        R.forEach(({ target, withTarget, method, path, callback }) => {
          if (withTarget) {
            const prefix = resolvePath(target[pathPrefix]);
            router[method](prefix + path, ...callback);
          } else {
            router[method](path, ...callback);
          }
        })(routeMap);
    
        app.use(router.routes());
        app.use(router.allowedMethods());
      };
}

export const RequestMapping = (requestmapping = {method:"get",url:""})=>(target,key,descriptor) =>{
    routeMap.push({
        target:target,
        method:requestmapping.method,
        path:requestmapping.url ? requestmapping.url : `/${descriptor.value.name}`
    })
}

export const Controller = target =>{
    console.log("target",target);
    return(target.prototype[pathPrefix] = target.name);
}
export const NspRender = parmas => convert(nspRender(parmas));