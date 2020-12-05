import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect'; //next middleware

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;

const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function database(req, res, next){
    if(!client.isConnected()) {
        await client.connect();
    }

    req.dbClient = client;
    req.db = client.db(MONGO_DB);
    return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;