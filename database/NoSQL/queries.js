const session = require('./index.js');

const cypher = 'Create (p:Person {name: {name} })';
const params = { name: 'Hello Word' };

session.run(cypher, params);
