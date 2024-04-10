import { Edit, SimpleForm, TextInput, required, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, NumberInput, ArrayInput, SelectInput, SimpleFormIterator } from "react-admin";

export const ItemEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="Nom de l'article" source="name" validate={[required()]} />
            <NumberInput source="price" label="Prix" validate={[required()]} />
            <ArrayInput label="Contenu de l'article" validate={[required()]} source="content">
                <SimpleFormIterator inline>
                    <TextInput source="name" helperText={false} />
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput validate={[required()]} source="category" choices={[
                { id: 'weapon', name: 'Armes' },
                { id: 'ammo', name: 'Munitions' },
                { id: 'medical', name: 'Médical' },
                { id: 'vehicles', name: 'Véhicules' },
                { id: 'food', name: 'Nourriture' },
                { id: "pack", name: "Pack d'items" }
            ]} />
        </SimpleForm>
    </Edit>
);

export default ItemEdit;