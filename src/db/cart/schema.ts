import mongoose, { Schema } from 'mongoose';

// Définition de l'interface représentant un document serveur
export interface ICart {
  steam_id: String,
  items: String[],
}

// Schéma Mongoose pour la collection "servers"
const CartSchema = new Schema<ICart>({
  steam_id: { type: String, required: true },
  items: { type: [String], required: true }
});

// Création ou récupération du modèle Mongoose pour la collection "servers"
const CartModel = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default CartModel;
