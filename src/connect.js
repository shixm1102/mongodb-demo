const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

/* 
  Connect to MongoDB
    client.connect
*/

// 连接到一个MongoDB实例 Connect to a Single MongoDB Instance
// Connection URL
const urlSingle = "mongodb://localhost:27017";

// 连接到一个副本集 Connect to a Replica Set
// Connection URL
const urlReplica = "mongodb://localhost:27017,localhost:27018/?replicaSet=foo";

// 连接到分片集群 Connect to Sharded Cluster
// Connection URL
const urlSharded = "mongodb://localhost:50000,localhost:50001";

const url = urlSingle || urlReplica || urlSharded;
// Database Name
const dbName = "myproject";
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

try {
  // Connection Options
  console.log("=== Connection Options ===");

  // Connection URL
  const url =
    'mongodb://dave:password@localhost:27017?authMechanism=DEFAULT&authSource=db&tls=true"';

  // Create a client, passing in additional options
  const client = new MongoClient(url, {
    tlsCAFile: `${__dirname}/certs/ca.pem`,
    tlsCertificateKeyFile: `${__dirname}/certs/client.pem`,
  });

  // Use connect method to connect to the server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    client.close();
  });
} catch (error) {
  console.log("===4===");
}
