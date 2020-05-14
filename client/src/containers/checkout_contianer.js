import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { selectorTotalAmountCart } from '../selectors/selector_list_statistics'
import Checkout from '../components/Checkout/checkout'
import { addUserAddress } from '../actions/users_actions'
import { deleteALlFromCart, clearCart } from '../actions/cart_actions'

class CheckoutContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step1: true,
            step2: false,
            step2Unlock: false,
            step3: false,
            step3Unlock: false,
            email: '',
            emailIsValid: true,
            firstName: 'Test',
            lastName: 'User',
            postalCode: 123456,
            phoneNumber: 1234567890,
            address1: 'AddressLine1',
            address2: 'AddressLine2',
            shippingMethod: 2,
            formIsValid: false,
            totalDelivery: 0,
        }
    }

    onChangeEmail = (e) => this.setState({ email: e.target.value })
    onChangeFirstName = (e) => this.setState({ firstName: e.target.value })
    onChangeLastName = (e) => this.setState({ lastName: e.target.value })
    onChangeCountry = (e) => this.setState({ country: e.target.value })
    onChangeCity = (e) => this.setState({ city: e.target.value })
    onChangeProvince = (e) => this.setState({ province: e.target.value })
    onChangePostalCode = (e) =>
        this.setState({ postalCode: Number(e.target.value) })
    onChangePhoneNumber = (e) =>
        this.setState({ phoneNumber: Number(e.target.value) })
    onChangeAdress1 = (e) => this.setState({ address1: e.target.value })
    onChangeAdress2 = (e) => this.setState({ address2: e.target.value })
    onChangeShipppingMethod = (shippingMethod) =>
        this.setState({ shippingMethod })
    handleEmailValidation = (emailIsValid) => this.setState({ emailIsValid })
    formValidator = (formIsValid) => this.setState({ formIsValid })

    toggle = (step) => {
        step === 'step1'
            ? this.setState({
                  step1: true,
                  step2: false,
                  step3: false,
              })
            : step === 'step2'
            ? this.setState({
                  step1: false,
                  step2: true,
                  step3: false,
              })
            : step === 'step3' &&
              this.setState({
                  step1: false,
                  step2: false,
                  step3: true,
              })
    }

    stepsUnlock = (step) => {
        step === 'step2'
            ? this.setState({
                  step2Unlock: true,
                  step1: false,
                  step2: true,
                  step3: false,
              })
            : step === 'step3' &&
              this.setState({
                  step3Unlock: true,
                  step1: false,
                  step2: false,
                  step3: true,
              })
    }

    onSubmitOrder = async () => {
        try {
            const {
                email,
                firstName,
                lastName,
                postalCode,
                phoneNumber,
                address1,
                address2,
                totalDelivery,
            } = this.state
            const { getCart, selectorTotalAmountCart } = this.props
            const ref = Math.random().toString(36).substring(5) + Date.now()
            const req = axios.post('/api/add/orders', {
                ref,
                customerinfo: {
                    email,
                    firstName,
                    lastName,
                    postalCode,
                    phoneNumber,
                    address1,
                    address2,
                },
                order: getCart.map((x) => ({
                    idItem: x._id,
                    titleItem: x.title,
                    price: x.price,
                    quantity: x.quantity,
                })),
                totalDelivery,
                totalAmount: selectorTotalAmountCart,
            })
            const res = await req
            if (res.status == 200) {
                this.props.clearCart([])
                alert('Order Succesfully Placed!')
                this.props.history.push('/')
            } else {
                alert('Order could not be placed!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = async () => {
        try {
            const token = window.localStorage.getItem('token')
            const req = axios({
                method: 'get',
                url: '/api/users/me',
                headers: {
                    authorization: token,
                },
            })
            const res = await req
            if (res.data.address1 != undefined) {
                this.props.addUserAddress(res.data.address1)
                this.setState({
                    address1: res.data.address1,
                })
            }
            this.setState({
                email: res.data.email,
                firstName: res.data.name,
            })
        } catch (error) {
            console.log(error)
        }

        if (this.props.isLoggedIn !== true) {
            return this.props.history.push('/signin')
        }

        if (this.props.getCart.length === 0) {
            alert('Please add something to cart!')
            this.props.history.push('/productslist/books')
        }
    }

    render() {
        return (
            <div>
                <Checkout
                    {...this.state}
                    {...this.props}
                    onChangeFirstName={this.onChangeFirstName}
                    onChangeLastName={this.onChangeLastName}
                    onChangePostalCode={this.onChangePostalCode}
                    onChangePhoneNumber={this.onChangePhoneNumber}
                    onChangeAdress1={this.onChangeAdress1}
                    onChangeAdress2={this.onChangeAdress2}
                    onChangeShipppingMethod={this.onChangeShipppingMethod}
                    stepsUnlock={this.stepsUnlock}
                    toggle={this.toggle}
                    onChangeEmail={this.onChangeEmail}
                    handleEmailValidation={this.handleEmailValidation}
                    formValidator={this.formValidator}
                    onSubmitOrder={this.onSubmitOrder}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    getCart: state.cartReducer,
    getUserAddress: state.getUserAddress,
    selectorTotalAmountCart: selectorTotalAmountCart(state),
})

const mapDispatchToProps = (dispatch) => ({
    clearCart: (x) => dispatch(clearCart(x)),
    addUserAddress: (x) => dispatch(addUserAddress(x)),
    deleteALlFromCart: (x) => dispatch(deleteALlFromCart(x)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)
