import "@babel/polyfill";
require('./config/passport');
import server from "./config/server";


console.log("Database_URL", process.env.MONGODB_URI);

const main = async () => {
    await server.listen(server.get('port'));
    console.log(`Server on port: ${server.get('port')}`);
}

main();