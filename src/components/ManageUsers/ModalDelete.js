import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const ModalDelete = (props) => {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Cornfim Delete User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Woohoo, you are sure to delete this user: {props.dataModal.email} ?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={props.confirmDeleteUser}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalDelete;
