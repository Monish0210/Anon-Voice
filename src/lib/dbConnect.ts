import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to Database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log("db instance: ", db); // to check what is returnend after database connection
        console.log("db.connections: ", db.connections);

        connection.isConnected = db.connections[0].readyState;

        console.log("Database connected succesfully");
    } catch (error) {
        console.log("DB Connection Failed: ", error);
        process.exit(1);       
    }
}