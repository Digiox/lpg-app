import { Edit, SimpleForm, TextInput, required, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, NumberInput } from "react-admin";

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
           <TextInput source="id" label="Steam ID"  />
           <TextInput source="username" label="Pseudo in-game" />
           <NumberInput source="balance" label="Crédits"/>
           </SimpleForm>
    </Edit>
);

export default UserEdit;