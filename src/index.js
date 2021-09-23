import "@babel/polyfill";
require('./config/passport');
import server from "./config/server";


console.log("Database_URL", process.env.DATABASE_URL);

const main = async () => {
    await server.listen(server.get('port'));
    console.log(`Server on port: ${server.get('port')}`);
}

main();