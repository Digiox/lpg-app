import { ChangeEvent, useState } from "react";
import Notification from "../Notifications/Notification";
import { toast } from "react-toastify";
import axios from "axios";

interface IProps {
    steam_id: String
    callback?: () => void
}

const UserNameModal = (props: IProps) => {
    const [username, setUsername] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
        setUsername(input.target.value)
    }
    const { steam_id } = props
    const handleNotification = () => {
        if (!username) {
            return toast.error("Vous devez entrer un pseudo", {
                position: "top-right",
                autoClose: 5000, // Le toast se ferme automatiquement après 5000ms
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsLoading(true)
        axios.post("/api/users", {
            steam_id: steam_id,
            username: username
        })
            .then((res) => {
                if (props.callback) {
                    props.callback()
                }
                return toast.success("Votre pseudo à été mis à jour.", {
                    position: "top-right",
                    autoClose: 5000, // Le toast se ferme automatiquement après 5000ms
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
            .catch((err) => {
                console.log(err.response);
                
                if (err.response.data === "already_exist") {
                    if (props.callback) {
                        props.callback()
                    }
                    return toast.error("Vous êtes déjà enregistré.", {
                        position: "top-right",
                        autoClose: 5000, // Le toast se ferme automatiquement après 5000ms
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <div className="h-screen w-screen top-0 left-0 bg-opacity-60  bg-black absolute z-15 flex justify-center items-center">
            <div className="w-1/4 h-1/2 bg-white rounded-md  flex justify-center items-center bg-opacity-15 relative">
                <div className="flex flex-col absolute top-20">
                    <label className="pb-10 font-krona text-center">Entrez votre pseudo en jeu (PVE)</label>
                    <input
                        onChange={(input) => { handleChange(input) }}
                        className="mx-5 p-2 rounded-lg border-2 bg-white bg-opacity-20 placeholder-white placeholder-opacity-50 text-white"
                        placeholder="Username"
                    />
                    <div>
                        <p className="p-10 text-red-200 text-center">Votre pseudo est requis pour distribuer vos items en jeu si vous utilisez la boutique, vous pouvez le changer à tout moment depuis votre profil.</p>
                    </div>
                </div>
                <button onClick={(() => {
                    handleNotification()
                })} className="mt-auto font-krona bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded-full w-1/2 focus:outline-none focus:shadow-outline absolute bottom-10">
                    {isLoading ? "loading..." : "CONFIRMER"}
                </button>

            </div>
        </div>
    );
}

export default UserNameModal;
