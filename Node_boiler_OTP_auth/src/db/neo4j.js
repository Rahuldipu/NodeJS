const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = require("../config");
const neo4j = require("neo4j-driver");

// Create and export a function to establish a Neo4j session
module.exports = function createNeo4jSession() {
    const driver = neo4j.driver(
        NEO4J_URI,
        neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
    );

    const session = driver.session();
    return session;
};
