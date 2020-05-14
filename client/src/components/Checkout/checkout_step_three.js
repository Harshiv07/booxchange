import PropTypes from 'prop-types'
import React from 'react'
import { Badge, Button, ListGroupItem, Collapse, Col, Row } from 'reactstrap'

const propTypes = {
    toggle: PropTypes.func.isRequired,
    step3: PropTypes.bool.isRequired,
    step3Unlock: PropTypes.bool.isRequired,
    getUserAddress: PropTypes.object.isRequired,
    onSubmitOrder: PropTypes.func.isRequired,
}

const CheckoutStepThree = ({
    styles,
    step3,
    step3Unlock,
    toggle,
    getUserAddress,
    onSubmitOrder,
}) => {
    const {
        address1,
        firstName,
        lastName,
        phoneNumber,
        postalCode,
    } = getUserAddress

    return (
        <div style={styles.collapsePannel}>
            <ListGroupItem disabled={!step3}>
                <h3
                    style={styles.collapasePannelTitle}
                    onClick={() => step3Unlock && toggle('step3')}
                >
                    <Badge color="secondary" pill size="sm">
                        3
                    </Badge>{' '}
                    Customer
                </h3>
                <Collapse isOpen={step3}>
                    <Row>
                        <Col md="6">
                            <h4>Delivery address:</h4>
                            <div>
                                First Name: <b>{firstName}</b>
                            </div>
                            <div>
                                Last Name: <b>{lastName}</b>
                            </div>
                            <div>
                                Tel: <b>{phoneNumber}</b>
                            </div>
                            <div>
                                Postal Code: <b>{postalCode}</b>
                            </div>
                            <div>
                                Address: <b>{address1}</b>
                            </div>
                        </Col>
                        <Col md="6">
                            <h4>Only COD allowed!</h4>
                        </Col>
                    </Row>
                    <br />
                    <hr />
                    <Row>
                        <Button className="primary" onClick={onSubmitOrder}>
                            Confirm Order
                        </Button>
                    </Row>
                </Collapse>
            </ListGroupItem>
        </div>
    )
}

CheckoutStepThree.propTypes = propTypes

export default CheckoutStepThree
