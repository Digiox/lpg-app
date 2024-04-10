import { useEffect, useState } from "react"
import Nav from "../../components/navbar/Nav"
import { IUser } from "../../db/user/schema"
import { useSession, signOut } from "next-auth/react"
import axios from "axios"
import { Session } from "next-auth"
import { IItem } from "../../db/item/schema"
import { toast } from "react-toastify"
import BlueSpinner from "../../components/spinners/BlueSpinner"


interface CustomSession extends Session {
    user: {
        steam?: {
            steamid: string;
        }
    } & Session["user"];
}
const Shop = () => {



    const { data: session } = useSession()
    const [user, setUser] = useState<IUser | undefined>()
    const [showItemSpinner, setShowItemSpinner] = useState<boolean>(false)
    const customSession = session as CustomSession;
    interface IFullItem extends IItem {
        _id: String
    }
    const handleAddToCart = (item: IFullItem) => {
        axios.put(`/api/users/${customSession.user.steam?.steamid}/cart`, {
            item_id: item._id
        })
            .then(() => {
                toast.success("Item added to cart")
            })
            .catch((error) => {
                console.log(error);

            })
    }

    useEffect(() => {
        setShowItemSpinner(true)
        if (session?.user) {
            axios.get("/api/users/" + customSession.user.steam?.steamid)
                .then((res: any) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    console.log(err);

                })
                .finally(() => {
                    setShowItemSpinner(false)
                })
        }

    }, [session])
    const [items, setItems] = useState<IFullItem[]>([])

    useEffect(() => {
        axios.get("/api/items")
            .then((res: any) => {
                setItems(res.data)
            })
            .catch((err) => {
                console.log(err);

            })
    }, [])

    const handleClickFilter = (category: String) => {
        setShowItemSpinner(true)
        axios.get("/api/items?category=" + category)
            .then((res: any) => {
                console.log(res.data);

                setItems(res.data)
            })
            .catch((err) => {
                console.log(err);

            })
            .finally(() => {
                setShowItemSpinner(false)
            })
    }

    const categories = [
        {
            display: "Packs",
            name: "pack"
        },
        {
            display: "Armes",
            name: "weapon"
        },
        {
            display: "Munitions",
            name: "ammo"
        },
        {
            display: "Médical",
            name: "medical"
        },
        {
            display: "Véhicules",
            name: "vehicles"
        }
    ]
    return <div className="relative min-h-screen bg-img-bg-shop bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
            <Nav />

            <div className="flex gap-6">
                <div className="ml-10 p-4 bg-white bg-opacity-10 w-1/4 h-full text-white flex-col">
                    <div className="bg-white flex justify-between w-2/3 m-auto mb-10 p-1">
                        <input className="p-1 w-1/2" placeholder="Rechercher" />
                        <img src="/img/search.svg" />
                    </div>
                    <div className="flex-col flex  gap-5 p-3 mb-10">
                        {categories.map(category => {
                            return <button onClick={() => handleClickFilter(category.name)} className="text-left hover:bg-white hover:bg-opacity-10 p-3">{category.display}</button>
                        })}
                    </div>
                    {user && <p className="font-krona font-bold">{user.balance} crédits</p>}
                </div>
                <div className="grid grid-rows-4 grid-flow-col gap-4 w-full">
                    {!showItemSpinner ?
                        items.map((item: IFullItem) => {
                            return <div className="bg-white flex  bg-opacity-20 text-white flex-col text-center gap-3 text-lg">
                                <h3>{item.name}</h3>
                                <h4>{item.price} Crédits</h4>
                                <div className="flex gap-2 justify-center">
                                    <button className="border-0 bg-white bg-opacity-20 py-1 px-2 w-full hover:bg-opacity-40">Détails</button>
                                    <button onClick={() => {
                                        handleAddToCart(item)
                                    }} className="border-2 border-white py-1 px-2 w-full hover:bg-white hover:bg-opacity-40">Ajouter</button>
                                </div>
                            </div>
                        }) : <BlueSpinner />
                    }
                </div>

            </div>


        </div>
    </div>
}

export default Shop