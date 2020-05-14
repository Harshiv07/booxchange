import PropTypes from 'prop-types'
import React from 'react'
import {
    Row,
    Col,
    Input,
    Badge,
    Button,
    ListGroupItem,
    Collapse,
    Label,
    Alert,
    FormGroup,
} from 'reactstrap'

const propTypes = {
    addUserAddress: PropTypes.func.isRequired,
    step2: PropTypes.bool.isRequired,
    step2Unlock: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    phoneNumber: PropTypes.number.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    shippingMethod: PropTypes.number.isRequired,
    formIsValid: PropTypes.bool.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeLastName: PropTypes.func.isRequired,
    onChangeCountry: PropTypes.func.isRequired,
    onChangeCity: PropTypes.func.isRequired,
    onChangeProvince: PropTypes.func.isRequired,
    onChangePostalCode: PropTypes.func.isRequired,
    onChangePhoneNumber: PropTypes.func.isRequired,
    onChangeAdress1: PropTypes.func.isRequired,
    onChangeAdress2: PropTypes.func.isRequired,
    onChangeShipppingMethod: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    stepsUnlock: PropTypes.func.isRequired,
    formValidator: PropTypes.func.isRequired,
}

const CheckoutStepTwo = ({
    styles,
    step2,
    step2Unlock,
    toggle,
    stepsUnlock,
    onChangeFirstName,
    onChangeLastName,
    onChangePostalCode,
    onChangePhoneNumber,
    onChangeAdress1,
    onChangeAdress2,
    firstName,
    lastName,
    postalCode,
    phoneNumber,
    address1,
    address2,
    formValidator,
    formIsValid,
    addUserAddress,
}) => {
    const validatorClient = {
        firstName: firstName.length > 2 && typeof firstName === 'string',
        lastName: lastName.length > 2 && typeof lastName === 'string',
        postalCode:
            typeof postalCode === 'number' && postalCode.toString().length == 7,
        phoneNumber:
            typeof phoneNumber === 'number' &&
            phoneNumber.toString().length == 10,
        address1: address1.length > 2 && typeof address1 === 'string',
    }

    const warningValidator = (x) => {
        if (x) {
            if (
                [
                    ...new Set(
                        Object.entries(validatorClient).map(([k, v]) => v)
                    ),
                ].sort()[0] === false
            ) {
                return (
                    <Row>
                        <Alert color="danger">
                            Please fill these fields correctly:
                            {!validatorClient.firstName && (
                                <div>First Name</div>
                            )}
                            {!validatorClient.lastName && <div>Last Name</div>}
                            {!validatorClient.postalCode && (
                                <div>Postal Code: 7 digits</div>
                            )}
                            {!validatorClient.phoneNumber && (
                                <div>Phone Number: 10 digits</div>
                            )}
                            {!validatorClient.address1 && (
                                <div>Address1 field</div>
                            )}
                        </Alert>
                    </Row>
                )
            } else {
                return (
                    <Alert color="success">Thank you! Click 'continue'</Alert>
                )
            }
        }
    }

    return (
        <div style={styles.collapsePannel}>
            <ListGroupItem disabled={!step2}>
                <h3
                    style={styles.collapasePannelTitle}
                    onClick={() => step2Unlock && toggle('step2')}
                >
                    <Badge color="secondary" pill size="sm">
                        2
                    </Badge>{' '}
                    Shipping {}
                </h3>
                <Collapse isOpen={step2}>
                    <Row>
                        <Col md={6} style={styles.formFieldsSpace}>
                            <Label for="First name">First name</Label>
                            <Input
                                type="text"
                                onChange={onChangeFirstName}
                                value={firstName}
                            />
                        </Col>
                        <Col md={6} style={styles.formFieldsSpace}>
                            <Label for="exampleEmail">last Name</Label>
                            <Input
                                type="text"
                                onChange={onChangeLastName}
                                value={lastName}
                            />
                        </Col>
                        <Col md={6} style={styles.formFieldsSpace}>
                            <Label>Postal Code</Label>
                            <Input
                                type="text"
                                onChange={onChangePostalCode}
                                value={postalCode}
                            />
                        </Col>
                        <Col md={6} style={styles.formFieldsSpace}>
                            <Label>Phone Number</Label>
                            <Input
                                type="number"
                                onChange={onChangePhoneNumber}
                                value={phoneNumber}
                            />
                        </Col>
                        <Col md={12} style={styles.formFieldsSpace}>
                            <Label for="Address1">Address1</Label>
                            <Input
                                type="text"
                                onChange={onChangeAdress1}
                                value={address1}
                            />
                        </Col>
                        <Col md={12} style={styles.formFieldsSpace}>
                            <Label>Address2</Label>
                            <Input
                                type="text"
                                onChange={onChangeAdress2}
                                value={address2}
                            />
                        </Col>
                        <div className="d-flex align-items-center">
                            <br />
                            <br />
                            <br />
                            <Button
                                disabled={false}
                                onClick={() => {
                                    if (
                                        [
                                            ...new Set(
                                                Object.entries(
                                                    validatorClient
                                                ).map(([k, v]) => v)
                                            ),
                                        ].sort()[0]
                                    ) {
                                        return (
                                            stepsUnlock('step3'),
                                            addUserAddress({
                                                firstName,
                                                lastName,
                                                postalCode,
                                                phoneNumber,
                                                address1,
                                                address2,
                                            })
                                        )
                                    } else {
                                        formValidator(true)
                                    }
                                }}
                            >
                                continue
                            </Button>
                        </div>
                    </Row>
                    {warningValidator(formIsValid)}
                </Collapse>
            </ListGroupItem>
        </div>
    )
}

CheckoutStepTwo.propTypes = propTypes

export default CheckoutStepTwo
