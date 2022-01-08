import React from 'react';
import {People} from "./App";
import {useConfirmationModalContext} from "./modalConfirmationContext";

type DeleteButtonProps = React.HTMLProps<HTMLButtonElement> & {
    person: People
}

const DeleteButton: React.FC<DeleteButtonProps> = ({children, className, person, onClick}) => {
    const modalContext = useConfirmationModalContext();

    const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const result = await modalContext.showConfirmation(
            'Delete Confirmation!',
            <div style={{border: "2px solid blue", padding: "10px"}}>
                <p>
                    Are you sure you want to delete
                    <strong>[{person.id}</strong> - <span style={{fontSize: "18px"}}><i> {person.last_name}, {person.first_name}]</i></span> from the database?

                </p>
                <img width="100" style={{display: "block", margin: "0 auto"}} src="https://www.pngmart.com/files/7/Danger-Sign-PNG-Transparent.png"/>
            </div>
        );
        result && onClick && onClick(event);
    };

    return (
        <button className={className} onClick={handleOnClick}>
            {children}
        </button>
    )
};

export default DeleteButton;
