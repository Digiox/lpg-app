import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface représentant un document utilisateur
export interface IUser {
  _id: String,
  username: string;
  steam_id: string;
  balance?: number
}

// Schéma Mongoose pour la collection "users"
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true }, // Rendre le username unique
  steam_id: { type: String, required: true, unique: true }, // Rendre le steam_id unique
  balance: { type: Number }
});

// Création du modèle Mongoose pour la collection "users"
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
