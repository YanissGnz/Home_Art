var mongoClient = require("mongodb").MongoClient;

class mongoDbClient {

  async connect(conn){
    // this.connection = {}
    try {
        this.client = new mongoClient(conn.url, { useNewUrlParser: true, useUnifiedTopology: true });
        this.connection = await this.client.connect();
        this.db = this.connection.db(conn.dbName);
        console.log("MongoClient Connection successfull.");
    }
    catch(ex) {
      console.log("Error caught,", ex);
    }
  }

  async getDocumentByQuery(coll, query) {
    return await this.db.collection(coll).findOne(query)
  }

  async close() {
    return await this.connection.close();
  }
}

module.exports = {
  mongoDbClient: mongoDbClient
}