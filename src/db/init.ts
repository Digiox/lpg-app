import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configuration de dotenv
dotenv.config();

// Récupération des variables d'environnement
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.CLUSTER;


// Construction de la chaîne de connexion
const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/lpg-front?retryWrites=true&w=majority`;

export const connectDB = async () => {
    console.log("URI ",uri);
    
    try {
        await mongoose.connect(uri);
        console.log('Database connected');
    } catch (error) {
        console.error('Connection to database failed', error);
        process.exit(1);
    }
};

connectDB();

export default mongoose;
