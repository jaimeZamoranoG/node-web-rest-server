import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/Server";

(()=>{
    main();
})();

function main(){

    const {PORT,PUBLIC_PATH} = envs;
    const server = new Server({
        port:PORT,
        routes:AppRoutes.routes,
        publicPath:PUBLIC_PATH
    });
    server.start();

}