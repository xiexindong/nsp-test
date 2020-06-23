import { Route } from '../decorator'
import { resolve } from 'path'

export const addRouter = app =>{
    console.log("app",app);
    const routesPath = resolve(__dirname,"../controller");
    const instance = new Route(app,routesPath);
    instance.init();
}