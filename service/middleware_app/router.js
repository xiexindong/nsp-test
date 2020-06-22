import { Route } from '../decorator'
import { resolve } from 'path'

export const  addRouter = app =>{
    const routesPath = resolve(__dirname,"../controiller");
    const instance = new Route(app,routesPath)
}