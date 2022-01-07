import React, {useContext, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";

type ModalContextType = {
    showConfirmation: (title: string, message: string | JSX.Element) => Promise<boolean>,
};

const ConfirmationModalContext = React.createContext<ModalContextType>({} as ModalContextType);

const useModalShow = () => {
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

const ConfirmationModalContextProvider = (props: any) => {
    const {setShow, show, onHide} = useModalShow();
    const resolver = useRef<Function>();

    const [content, setContent] = useState<{ title: string, message: string | JSX.Element } | null>();
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
        setContent(null);
        onHide();
    };

    const handleCancel = () => {
        resolver.current && resolver.current(false);
        setContent(null);
        onHide();
    };

    const getMessage = () => {
        if (typeof content?.message === 'string') {
            return <p>{content.message}</p>
        }

        return content?.message
    };

    return (
        <ConfirmationModalContext.Provider value={modalContext}>
            {props.children}

            {/*{(content as any).title}*/}
            {content &&
                <Modal show={show} onHide={onHide} centered dialogClassName={`modal-md`}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <label className="title">{(content as any).title}</label>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {getMessage()}
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
