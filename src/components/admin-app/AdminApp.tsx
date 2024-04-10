import { Admin as AdminWrapper, Create, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserList from "./list/UserList";
import UserCreate from "./create/UserCreate";
import ItemCreate from "./create/ItemCreate";
import UserEdit from "./edit/UserEdit";
import ItemEdit from "./edit/ItemEdit";

const AdminApp = () => {
    return <AdminWrapper dataProvider={jsonServerProvider("http://localhost:3000/api")}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}  />
        <Resource name="items" edit={ItemEdit}  list={ListGuesser} create={ItemCreate} show={ShowGuesser} />

    </AdminWrapper>
}

export default AdminApp;