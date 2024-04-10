import React from 'react';
interface IProps {
    message: string,
    type: "success" | "error"
}
const Notification = (props: IProps) => {
    // Choix des couleurs selon le type de notification
    const bgColor = props.type === 'success' ? 'bg-green-500' : props.type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const textColor = 'text-white';

    return (
        <div className={`${bgColor} ${textColor} p-4 rounded-md shadow-lg fixed top-5 right-5 z-50`}>
            <p>{props.message}</p>
        </div>
    );
};

export default Notification;
