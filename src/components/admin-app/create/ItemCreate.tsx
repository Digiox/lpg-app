import { ArrayInput, Create, NumberInput, SelectInput, SimpleForm, SimpleFormIterator, TextInput, required } from "react-admin"

const ItemCreate = () => {
    return <Create>
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
                ]} />
        </SimpleForm>
    </Create>
}

export default ItemCreate