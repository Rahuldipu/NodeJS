const createNeo4jSession = require('../db/neo4j');

async function pushDatatoGraphDB(req, res, next) {
    const { data, operationType } = req.body;
    const session = createNeo4jSession();
    try {
        if (operationType === 'insert') {
            console.log("Data: ", data);
            const neo4jQuery = `CREATE (node:User { _id: $documentId, firstName: $firstName, lastName: $lastName, city: $city, country: $country, profession: $profession, photoURL: $photoURL })`;

            const params = {
                documentId: data?._id?.toString() || '',
                firstName: data?.firstName || '',
                lastName: data?.lastName || '',
                city: data?.city || '',
                country: data?.country || '',
                profession: data?.profession || '',
                photoURL: data?.photoURL || ""
            };

            await session.run(neo4jQuery, params);
            console.log(`Inserted new document into Neo4j: ${data._id}`);
        } else if (operationType === 'update') {
            console.log("Updated data: ", data);
            const neo4jQuery = `
            MERGE (node:User { _id: $documentId })
            SET node.firstName = $firstName, node.lastName = $lastName, node.city = $city, node.country = $country, node.profession = $profession, node.photoURL = $photoURL
            `;

            const params = {
                documentId: data?._id?.toString() || '',
                firstName: data?.firstName || '',
                lastName: data?.lastName || '',
                city: data?.city || '',
                country: data?.country || '',
                profession: data?.profession || '',
                photoURL: data?.photoURL || ""
            };

            await session.run(neo4jQuery, params);
            console.log(`Updated Neo4j node for document: ${data._id}`);
        }

        return res.status(200).json({
            status: "success",
            message: "User data pushed to Neo4j",
            data: {
                userData: data,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        session.close();
    }

}

module.exports = {
    pushDatatoGraphDB
}