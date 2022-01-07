import React, {ReactEventHandler} from 'react';
import {useConfirmationModalContext} from "./modalConfirmationContext";

type DeleteButtonProps = React.HTMLProps<HTMLButtonElement> & {}

const DeleteButton: React.FC<DeleteButtonProps> = ({children, className, onClick}) => {
    const modalContext = useConfirmationModalContext();

    const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const result = await modalContext.showConfirmation('Confirmation', 'Are you sure?');

        result && onClick && onClick(event);
    };

    return (
        <button className={className} onClick={handleOnClick}>
            {children}
        </button>
    )
};

export default DeleteButton;
