import mongoose, { Schema } from 'mongoose';

// Définition de l'interface représentant un document serveur
export interface IServer {
  ip: string,
  port: number,
  rcon_port: number,
  rcon_password: string;
  top_server_token: string,
  mods?: String[]
}

// Schéma Mongoose pour la collection "servers"
const ServerSchema = new Schema<IServer>({
  ip: { type: String, required: true },
  port: { type: Number, required: true },
  rcon_port: { type: Number, required: true },
  rcon_password: { type: String, required: true },
  top_server_token: { type: String, required: true },
  mods: { type: [String], required: true }
});

// Création ou récupération du modèle Mongoose pour la collection "servers"
const ServerModel = mongoose.models.Server || mongoose.model<IServer>('Server', ServerSchema);

export default ServerModel;
