import bodyParser from "koa-bodyparser"
export const koaBodyParser = (app) =>{
    app.use(bodyParser())
}

