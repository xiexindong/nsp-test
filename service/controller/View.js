import { Controller,RequestMapping ,NspRender} from "../decorator";
const Axios = new AxiosHttp({
    timeout: 10000,
    baseURL: "http://202.96.155.121:8888/api"
  });

@Controller
class View{
    @RequestMapping({method:"get",url:"/"})
    @NspRender({ title: "NSP严选" })
    async home(ctx){
        const data = await Axios.httpRequest("/");
        ctx.initModel = { ...data };
    }
}

export default View

