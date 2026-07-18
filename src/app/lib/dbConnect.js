import { MongoClient, ServerApiVersion } from "mongodb";

export const collections = {
  PRODUCTS: "products",
  USERS: "users",
  BOOKINGS: "bookings",
};

// Lazily initialized — built on first call so env vars are resolved at
// request time (not at module-load time when they may still be undefined).
let client;
let clientPromise;

function getClientPromise() {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing environment variable: MONGODB_URI. " +
      "Make sure it is set in your .env file and the server has been restarted."
    );
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  clientPromise = client.connect();
  return clientPromise;
}

export async function dbConnect(collectionName) {
  await getClientPromise();
  const dbname = process.env.DB_NAME;
  if (!dbname) {
    throw new Error(
      "Missing environment variable: DB_NAME. " +
      "Make sure it is set in your .env file."
    );
  }
  return client.db(dbname).collection(collectionName);
}