require('dotenv').config();
const neo4j = require('neo4j-driver');

const port = process.env.neo4jPort;
const password = process.env.neo4jPassword;
const user = process.env.neo4jUser;

const driver = neo4j.driver(`bolt://localhost:${port}`, neo4j.auth.basic(`${user}`, `${password}`));

const session = driver.session();

module.exports = session;
