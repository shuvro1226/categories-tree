import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategoryModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.closeModal}>
            {/* <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header> */}

            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Category Title" value={props.title} onChange={(event) => props.changeTitle(event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>Close</Button>
                <Button variant="primary" onClick={props.saveCategory}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal;