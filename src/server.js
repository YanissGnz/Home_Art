const mongoMod = require('../lib/mongoClient')
const CONF = require('../config/database.json')
var db = new mongoMod.mongoDbClient()

async function run() {
    var documents = {}
    try {
        await db.connect(CONF.mongo);
        documents = await db.getDocumentByQuery(coll = "art-collection", query = { "category": 'table' })
    } finally {
        await db.close();
        console.log(documents)
    }
}
run().catch(console.dir);
