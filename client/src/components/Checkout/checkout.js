import PropTypes from 'prop-types'
import React from 'react'
import CheckoutStepOne from './checkout_step_one'
import CheckoutStepTwo from './checkout_step_two'
import CheckoutStepThree from './checkout_step_three'
import CheckoutMiniSummary from './checkout_mini_summary'
import { Row, Col, Container, Progress, ListGroup } from 'reactstrap'

const propTypes = {
    getCart: PropTypes.array.isRequired,
    addUserAddress: PropTypes.func.isRequired,
    getUserAddress: PropTypes.object.isRequired,
    step1: PropTypes.bool.isRequired,
    step2: PropTypes.bool.isRequired,
    step3: PropTypes.bool.isRequired,
    step2Unlock: PropTypes.bool.isRequired,
    step3Unlock: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
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
    onChangePostalCode: PropTypes.func.isRequired,
    onChangePhoneNumber: PropTypes.func.isRequired,
    onChangeAdress1: PropTypes.func.isRequired,
    onChangeAdress2: PropTypes.func.isRequired,
    onChangeShipppingMethod: PropTypes.func.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    stepsUnlock: PropTypes.func.isRequired,
    formValidator: PropTypes.func.isRequired,
    onSubmitOrder: PropTypes.func.isRequired,
}

const styles = {
    container: {
        paddingTop: '120px',
        paddingBottom: '120px',
    },
    h1: {
        paddingBottom: '20px',
    },
    collapsePannel: {
        borderBottom: '1px solid grey',
    },
    collapasePannelTitle: {
        cursor: 'pointer',
    },
    formFieldsSpace: {
        paddingTop: '10px',
    },
}

const CheckoutContainer = ({
    getCart,
    addUserAddress,
    getUserAddress,
    step1,
    step2,
    step3,
    step2Unlock,
    step3Unlock,
    email,
    firstName,
    lastName,
    postalCode,
    phoneNumber,
    address1,
    address2,
    shippingMethod,
    formIsValid,
    onChangeFirstName,
    onChangeLastName,
    onChangePostalCode,
    onChangePhoneNumber,
    onChangeAdress1,
    onChangeAdress2,
    onChangeShipppingMethod,
    onChangeEmail,
    toggle,
    stepsUnlock,
    formValidator,
    emailIsValid,
    handleEmailValidation,
    onSubmitOrder,
    selectorTotalAmountCart,
    totalDelivery,
}) => (
    <div>
        <Progress value={step3Unlock ? 100 : step2Unlock ? 66 : 33} />
        <Container style={styles.container}>
            <h1 style={styles.h1}>Check out</h1>
            <Row>
                <Col md="8">
                    <ListGroup flush>
                        <CheckoutStepOne
                            styles={styles}
                            email={email}
                            emailIsValid={emailIsValid}
                            handleEmailValidation={handleEmailValidation}
                            onChangeEmail={onChangeEmail}
                            stepsUnlock={stepsUnlock}
                            step1={step1}
                            step2={step2}
                            step2Unlock={step2Unlock}
                            toggle={toggle}
                        />
                        <CheckoutStepTwo
                            styles={styles}
                            stepsUnlock={stepsUnlock}
                            step2={step2}
                            step2Unlock={step2Unlock}
                            toggle={toggle}
                            onChangeFirstName={onChangeFirstName}
                            onChangeLastName={onChangeLastName}
                            onChangePostalCode={onChangePostalCode}
                            onChangePhoneNumber={onChangePhoneNumber}
                            onChangeAdress1={onChangeAdress1}
                            onChangeAdress2={onChangeAdress2}
                            onChangeShipppingMethod={onChangeShipppingMethod}
                            email={email}
                            firstName={firstName}
                            lastName={lastName}
                            postalCode={postalCode}
                            phoneNumber={phoneNumber}
                            address1={address1}
                            address2={address2}
                            shippingMethod={shippingMethod}
                            formValidator={formValidator}
                            formIsValid={formIsValid}
                            addUserAddress={addUserAddress}
                        />
                        <CheckoutStepThree
                            styles={styles}
                            step3={step3}
                            step3Unlock={step3Unlock}
                            toggle={toggle}
                            getUserAddress={getUserAddress}
                            onSubmitOrder={onSubmitOrder}
                            selectorTotalAmountCart={selectorTotalAmountCart}
                            totalDelivery={totalDelivery}
                        />
                    </ListGroup>
                </Col>
                <Col md="4">
                    <CheckoutMiniSummary
                        getCart={getCart}
                        selectorTotalAmountCart={selectorTotalAmountCart}
                        totalDelivery={totalDelivery}
                    />
                </Col>
            </Row>
        </Container>
    </div>
)

CheckoutContainer.propTypes = propTypes

export default CheckoutContainer
