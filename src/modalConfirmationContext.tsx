import React, {useContext, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";

type UseModalShowReturnType = {
    show: boolean;
    setShow: (value: boolean) => void;
    onHide: () => void;
}

const useModalShow = (): UseModalShowReturnType => {
    const [show, setShow] = useState(false);

    const handleOnHide = () => {
        setShow(false);
    };

    return {
        show,
        setShow,
        onHide: handleOnHide,
    }
};

type ModalContextType = {
    showConfirmation: (title: string, message: string | JSX.Element) => Promise<boolean>;
};

type ConfirmationModalContextProviderProps = {
    children: React.ReactNode
}

const ConfirmationModalContext = React.createContext<ModalContextType>({} as ModalContextType);

const ConfirmationModalContextProvider: React.FC<ConfirmationModalContextProviderProps> = (props) => {
    const {setShow, show, onHide} = useModalShow();
    const [content, setContent] = useState<{ title: string, message: string | JSX.Element} | null>();
    const resolver = useRef<Function>();

    const handleShow = (title: string, message: string | JSX.Element): Promise<boolean> => {
        setContent({
            title,
            message
        });
        setShow(true);
        return new Promise(function (resolve) {
            resolver.current = resolve;
        });
    };

    const modalContext: ModalContextType = {
        showConfirmation: handleShow
    };

    const handleOk = () => {
        resolver.current && resolver.current(true);
        onHide();
    };

    const handleCancel = () => {
        resolver.current && resolver.current(false);
        onHide();
    };

    return (
        <ConfirmationModalContext.Provider value={modalContext}>
            {props.children}

            {content &&
                <Modal show={show} onHide={onHide} centered dialogClassName={`modal-md`}>
                    <Modal.Header>
                        <label>{content.title}</label>
                    </Modal.Header>
                    <Modal.Body>
                        <label>{content.message}</label>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-default" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleOk}>OK</button>
                    </Modal.Footer>

                </Modal>}
        </ConfirmationModalContext.Provider>
    )
};

const useConfirmationModalContext = (): ModalContextType => useContext(ConfirmationModalContext);

export {
    useModalShow,
    useConfirmationModalContext,
}

export default ConfirmationModalContextProvider;
