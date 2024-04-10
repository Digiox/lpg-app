import { Create, SimpleForm, TextInput, required } from "react-admin"

const UserCreate = () => {
    return <Create>
        <SimpleForm>
            <TextInput source="username" validate={[required()]} />
            <TextInput source="steam_id" validate={[required()]} />
        </SimpleForm>
    </Create>
}

export default UserCreate