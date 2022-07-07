const cliProgress = require("cli-progress");
const { faker } = require("@faker-js/faker");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const collection = "articles"; // Your collection name
const ndocs = 20; // Number of dummy posts

console.log("Uploading dummy data. . .");

const categories = ["World", "Business", "Technology", "Health", "Sports"];

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(ndocs, 0);

for (let i = 0; i < ndocs; i++) {
  const obj = {
    author: faker.name.firstName() + " " + faker.name.lastName(),
    title: faker.lorem.sentence(),
    category: categories[Math.floor(Math.random() * categories.length)],
    excerpt: faker.lorem.sentence() + "" + faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    featuredImage: faker.image.imageUrl(),
    slug: faker.lorem.slug(),
    createdAt: faker.date.past(),
  };

  db.collection(collection).doc().set(obj);
  bar.update(1);
}
bar.stop();
console.log("Upload complete!");
