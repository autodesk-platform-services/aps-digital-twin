const path = require("path");
const fs = require("fs/promises");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

async function run(backupDir) {
    try {
        const database = client.db('test');

        const issues = await database.collection('issues').find().toArray();
        await fs.writeFile(path.join(backupDir, "issues.json"), JSON.stringify(issues));

        const parts = await database.collection('parts').find().toArray();
        await fs.writeFile(path.join(backupDir, "parts.json"), JSON.stringify(parts));

        const purchases = await database.collection('purchases').find().toArray();
        await fs.writeFile(path.join(backupDir, "purchases.json"), JSON.stringify(purchases));

        const reviews = await database.collection('reviews').find().toArray();
        await fs.writeFile(path.join(backupDir, "reviews.json"), JSON.stringify(reviews));
    } finally {
        await client.close();
    }
}

run(process.argv[2])
    .then(_ => console.log("Done!"))
    .catch(err => console.error(err));