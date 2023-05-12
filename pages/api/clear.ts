const { MongoClient } = require('mongodb');
import "../../.env";

const uri = process.env.REACT_APP_API_URL;
const client = new MongoClient(uri);

async function clearCollection(dbName: string, collectionName: string, interval: number) {
  setInterval(async () => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const result = await db.collection(collectionName).deleteMany({});
      console.log(`${result.deletedCount} documentos removidos da coleção ${collectionName}.`);
    } finally {
      await client.close();
    }
  }, interval);
}

clearCollection('test', 'Comment', 24 * 60 * 60 * 1000); // Executa a cada 24 horas (em milissegundos)
