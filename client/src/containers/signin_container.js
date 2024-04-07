import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../actions/users_actions'
import { connect } from 'react-redux'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col,
} from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class SignupContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: '',
            password: '',
            apiResponse: '',
            isLoggedIn: null,
            signUpModal: false,
            emailsignup: '',
            passwordsignup: '',
        }
    }

    onClickSignUpModal = () => {
        this.setState({
            signUpModal: !this.state.signUpModal,
        })
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangeEmailSignup = (e) => {
        this.setState({ emailsignup: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onChangePasswordSignup = (e) => {
        this.setState({ passwordsignup: e.target.value })
    }

    onLogin = async () => {
        try {
            const req = axios.post(
                process.env.REACT_APP_SERVER + '/api/users/login',
                {
                    email: this.state.email,
                    password: this.state.password,
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            )
            const response = await req
            localStorage.setItem('token', response.data.token)
            this.setState({ apiResponse: 'success' })
            this.setState({ isLoggedIn: true })
            this.props.loginUser(this.state.isLoggedIn)
            console.log(this.state.isLoggedIn)
        } catch (error) {
            this.setState({ apiResponse: 'Unauthorized' })
        }
    }

    onSignup = async () => {
        try {
            const req = axios.post(
                process.env.REACT_APP_SERVER + '/api/users',
                {
                    name: this.state.name,
                    email: this.state.emailsignup,
                    password: this.state.passwordsignup,
                }
            )
            const response = await req
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            this.setState({ apiResponse: 'success' })
            this.setState({ isLoggedIn: true })
            this.props.loginUser(true)
        } catch (error) {
            console.log(error)
            this.setState({ apiResponse: 'Unauthorized' })
            this.props.loginUser(false)
        }
    }

    redirectLoginSuccessListener = () => {
        if (
            this.state.apiResponse === 'success' &&
            this.state.isLoggedIn != null
        ) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { referrer: 'test' },
                    }}
                />
            )
        }
    }

    render() {
        const errors =
            this.state.apiResponse === 'Bad Request'
                ? 'Please fill the email and password fields'
                : this.state.apiResponse === 'Unauthorized' &&
                  'Email or password incorrect'

        return (
            <div>
                {this.redirectLoginSuccessListener()}
                <Container
                    className="App"
                    style={{ paddingTop: '150px', paddingBottom: '200px' }}
                >
                    <h2>User Signin Page</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Email Address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="abc@ahduni.edu.in"
                                    apiResponse
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="********"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </FormGroup>
                        </Col>
                        <Button onClick={this.onLogin}>Login</Button> &nbsp;
                        &nbsp;
                        <Button
                            color="primary"
                            onClick={this.onClickSignUpModal}
                        >
                            Sign Up
                        </Button>
                        <Modal
                            isOpen={this.state.signUpModal}
                            toggle={this.onClickSignUpModal}
                        >
                            <ModalHeader toggle={this.onClickSignUpModal}>
                                DO YOU WANT TO SIGNUP?
                            </ModalHeader>
                            <ModalBody>
                                <Form className="form">
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="name"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            apiResponse
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email Address</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="exampleEmail"
                                            placeholder="abc@ahduni.edu.in"
                                            apiResponse
                                            value={this.state.emailsignup}
                                            onChange={this.onChangeEmailSignup}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="examplePassword"
                                            placeholder="********"
                                            value={this.state.passwordsignup}
                                            onChange={
                                                this.onChangePasswordSignup
                                            }
                                        />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.onSignup}>
                                    Confirm Signup
                                </Button>{' '}
                                &nbsp; &nbsp;
                            </ModalFooter>
                        </Modal>
                        {/* <Link to="/dashboard">secret page</Link> */}
                        <p>{errors}</p>
                    </Form>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { user } = state
    return {
        user,
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (x) => dispatch(loginUser(x)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)
