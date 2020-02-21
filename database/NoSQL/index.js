require('dotenv').config();
const neo4j = require('neo4j-driver');

const cassandra = require('cassandra-driver');

const cassie = new cassandra.Client({ contactPoints: ['host1'] });

cassie.connect();
console.log(cassie);

module.exports = cassie;
