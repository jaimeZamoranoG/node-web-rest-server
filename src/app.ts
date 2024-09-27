import { envs } from "./config/envs";
import { Server } from "./presentation/Server";

(()=>{
    main();
})();

function main(){

    const {PORT,PUBLIC_PATH} = envs;
    const server = new Server({
        port:PORT,
        publicPath:PUBLIC_PATH
    });
    server.start();

}