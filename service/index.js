import App from "./app";
import config from "../config"

const { port,env } = config
let middlewares = ["bodyParser","views","router"];

try{
  const Server = new App(middlewares,port)
    if(env == "development"){
        Server.runDevTodo()
    }else{
        Server.runProTodo()
    }

}catch(e){
    console.log(e)
}
