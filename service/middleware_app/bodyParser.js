import bodyParser from "koa-bodyparser"
export const koaBodyParser = (app) =>{
    app.use((ctx,next)=>{
        console.log("ctx",ctx)
    })
;
}

