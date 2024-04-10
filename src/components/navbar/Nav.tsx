"use client"
import axios from "axios"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import UserNameModal from "../modals/UsernameModal"
import { Session } from "next-auth"
import Image from "next/image"

interface CustomSession extends Session {
    user: {
        steam?: {
            steamid: string;
        }
    } & Session["user"];
}

interface INavProps {
    cartCount?: (count: Number) => void
    setCount?: Number
}
const Nav = (props: INavProps) => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const [showUsernameModal, setUsernameModal] = useState<boolean>(false)
    const customSession = session as CustomSession;

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        signOut()
    };

    const Profile = () => {

        const [cartCount, setCartCount] = useState<String>("0")

        useEffect(() => {

        }, [])

        useEffect(() => {

            if (props.setCount) {
                setCartCount(JSON.stringify(props.setCount))
            }
        }, [])
        return (customSession?.user?.image && customSession?.user.steam?.steamid) && <div className="flex h-1/2 gap-4 justify-end pt-2">
            {/* @ts-nocheck */}
            {showUsernameModal && <UserNameModal steam_id={customSession?.user.steam?.steamid} callback={() => {
                setUsernameModal(false)
            }} />}
            <button
                // onClick={handleClick}
                className="relative rounded-full  object-cover shadow-lg flex justify-center items-center"
            >
                <Image
                    src="/img/basket.svg"
                    alt="Panier"
                    width={30}
                    height={30}
                />
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount} {/* Remplacez 3 par le nombre actuel d'articles dans le panier */}
                </span>
            </button>
            <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    <Image width={30} height={30} className="rounded-full w-12 h-12" src={customSession?.user?.image} alt="Profile" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <a
                            href="#profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profil
                        </a>
                        <a
                            href="/treasury"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Trésorerie
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Déconnexion
                        </button>
                    </div>
                )}
            </div>
        </div>
    }

    useEffect(() => {
        console.log(session);
        if (session?.user) {
            // @ts-ignore
            axios.get("/api/users/" + session?.user.steam.steamid)
                .then((res: any) => {
                    setUsernameModal(false)
                })
                .catch(err => {
                    console.log(err);

                    if (err.response.status === 404) {
                        setUsernameModal(true)
                    }
                })

        }
    }, [session])
    const pages = [
        {
            name: "Accueil",
            url: "/"
        },
        {
            name: "Serveurs",
            url: "/servers"
        },
        {
            name: "Boutique",
            url: "/shop"
        },
    ]
    return (
        <div className="sticky top-0 z-100 flex justify-between items-center text-white py-2 px-4 mt-0">


            <div className="flex gap-40 ml-40">
                {pages.map((page, i) => {
                    return <a key={i} href={page.url} className="font-krona text-xl hover:text-gray-300 hover:text-gray-400">{page.name}</a>
                })}
            </div>

            <div className="flex justify-end">
                {session ? <Profile /> : <button onClick={() => { signIn("steam") }} className="font-krona text-xl bg-white bg-opacity-10 border border border-white py-2 px-4 hover:bg-opacity-50 ">Connexion</button>}
            </div>
        </div>
    );
}

export default Nav;
