import { List, Datagrid, TextField } from 'react-admin';

export const UserList = () => (
    <List >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="steam_id" />
            <TextField source="balance" />
            {/* autres champs */}
        </Datagrid>
    </List>
);

export default UserList;