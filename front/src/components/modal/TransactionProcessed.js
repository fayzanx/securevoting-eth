import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function TransactionProcessed( props ) {
    return (
        <div className="modal-transaction">
            <Modal show={props.show} onHide={props.handleHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction {props.success ? 'Success' : 'Failure'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.success ? 'Transaction Successful' : 'Transaction Failure'}
                        . For further details, please see console or transaction history.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleHide}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default TransactionProcessed
