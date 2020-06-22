import { resolve } from "path";
import KoaRouter from "koa-router";
import glob from "glob";
import R from "ramda";


export class Route {
    constructor(app,routesPath){
        this.app = app;
        this.router =new KoaRouter();
        this.routesPath = routesPath;
    }

    init(){
        
        const { app, router, routesPath} = this;
        app.use(router.routes());
        app.use(router.allowedMethods());

    }


}