const neo4j = require("neo4j-driver");
const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        email: String,
        gender: String,
        dob: String,
        profession: String,
        city: String,
        country: String,

        deviceInfo: Schema.Types.Mixed,
        interests: [Schema.Types.Mixed],
        photoURL: String,

        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },

        otp: String,
        isValidated: Boolean,
    },
    { timestamps: true }
);

const UserModel = model("User", userSchema);

const app = async () => {
    const URI = "neo4j+s://9b850b17.databases.neo4j.io";
    const USER = "neo4j";
    const PASSWORD = "VO_ApcKU7lsWYFp2xF47NA1047BnYYxm67Y-Pw_ZOro";
    let driver, result, session;

    // Connect to database
    try {
        console.log("neo4j: ", neo4j.driver);
        driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        session = driver.session();
        const serverInfo = await driver.getServerInfo();
        console.log("Connection estabilished");
        console.log(serverInfo);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB connected");
    //     const userData = await UserModel.findById("64dc9e0846441a965fc462f6");
    //     console.log("user: ", userData._id);

    //     const neo4jQuery = `
    //   CREATE (node:Document { _id: $documentId, firstName: $firstName, lastName: $lastName, city: $city, country: $country, profession: $profession, photoURL: $photoURL })
    // `;

    //     const params = {
    //         documentId: userData?._id.toString() || '',
    //         firstName: userData?.firstName || '',
    //         lastName: userData?.lastName || '',
    //         city: userData?.city || '',
    //         country: userData?.country || '',
    //         profession: userData?.profession || '',
    //         photoURL: userData?.photoURL || ""
    //     };

    //     console.log("url: ", userData?.photoURL || "imageurl");

    //     await session.run(neo4jQuery, params);
    //     console.log(`Inserted new document into Neo4j: ${userData._id}`);

    //update
    // const neo4jQuery = `
    //   MERGE (node:Document { _id: $documentId })
    //   SET node.photoURL = $photoURL, node.random = $random
    // `;

    // const params = {
    //   documentId: "64e76a39e13020ebbddd144f",
    //   photoURL: "photo url",
    //   random: "random data"
    // };

    // await session.run(neo4jQuery, params);
    // console.log(`Updated Neo4j node for document: ${document._id}`);
    } catch (err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`);
        return;
    } finally {
        session.close();
    }

    // Create some nodes

    await driver.close();
};

app();
