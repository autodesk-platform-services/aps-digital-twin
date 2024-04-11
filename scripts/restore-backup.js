const path = require("path");
const fs = require("fs/promises");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

async function run(backupDir) {
    try {
        const database = client.db('test');

        const issues = JSON.parse(await fs.readFile(path.join(backupDir, "issues.json")));
        for (const issue of issues) {
            delete issue._id;
            delete issue.__v;
        }
        await database.collection('issues').insertMany(issues);

        const parts = JSON.parse(await fs.readFile(path.join(backupDir, "parts.json")));
        for (const part of parts) {
            delete part._id;
            delete part.__v;
        }
        await database.collection('parts').insertMany(parts);

        const purchases = JSON.parse(await fs.readFile(path.join(backupDir, "purchases.json")));
        for (const purchase of purchases) {
            delete purchase._id;
            delete purchase.__v;
        }
        await database.collection('purchases').insertMany(purchases);

        const reviews = JSON.parse(await fs.readFile(path.join(backupDir, "reviews.json")));
        for (const review of reviews) {
            delete review._id;
            delete review.__v;
        }
        await database.collection('reviews').insertMany(reviews);
    } finally {
        await client.close();
    }
}

run(process.argv[2])
    .then(_ => console.log("Done!"))
    .catch(err => console.error(err));