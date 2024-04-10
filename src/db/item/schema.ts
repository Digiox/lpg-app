import mongoose, { Schema } from 'mongoose';

// Définition de l'interface représentant un document serveur
export interface IItem {
  _id?: String,
  name: String,
  price: number,
  content: String[],
  category: "weapon" | "ammo" | "vehicles" | "credits" | "medical" | "food" | "pack"
}

// Schéma Mongoose pour la collection "servers"
const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: [String], required: true },
  category: {type: String, required: true}
});

// Création ou récupération du modèle Mongoose pour la collection "servers"
const ItemModel = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

export default ItemModel;
