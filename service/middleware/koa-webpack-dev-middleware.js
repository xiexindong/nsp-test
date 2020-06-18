import webpackDevMiddleware from "webpack-dev-middleware"



export default (compiler,options) =>{
    const devMiddleware = webpackDevMiddleware(compiler,options);

    const koaMiddleware = (ctx,next)=>{
        return  devMiddleware(ctx.req,next)
    }

    return koaMiddleware
}