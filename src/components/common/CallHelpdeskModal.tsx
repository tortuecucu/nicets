import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from "react-qr-code";
import { useHelpdeskContext } from '../../contexts/HelpdeskContext';

const CallHelpdeskModal = () => {
    const {showModal, setShowModal} = useHelpdeskContext()
    function handleClose() {
        setShowModal(false);
    }
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>En cas d'urgence, j'appelle le Helpdesk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="text-center">
                            <p className="fs-3 fw-bold">02 35 11 41 42</p>
                            <QRCode value="tel:+335114142" size={180} />
                            <p className="text-muted">scannez pour appeler</p>
                            <p className="lead">Le Helpdesk est à votre écoute 24h/24 7jours/7</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export { CallHelpdeskModal }