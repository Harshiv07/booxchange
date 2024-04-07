import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Col,
} from 'reactstrap'

class AdminContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            apiResponse: '',
        }
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onLogin = async () => {
        try {
            const req = axios({
                method: 'post',
                url: '/api/admin',
                data: {
                    id: this.state.email,
                    pass: this.state.password,
                },
            })
            const res = await req
            localStorage.setItem('adminID', res.data.token)
            res.status === 200
                ? this.setState({
                      apiResponse: 'Success',
                  })
                : this.setState({
                      apiResponse: 'Bad Request',
                  })
        } catch (error) {
            this.setState({ apiResponse: 'Unauthorized' })
            console.log(error)
        }
    }

    redirectLoginSuccessListener = () => {
        if (this.state.apiResponse === 'Success') {
            return (
                <Redirect
                    to={{
                        pathname: '/dashboard',
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
                    <h2>Admin Dashboard</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Admin</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="id"
                                    placeholder="Admin"
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
                                    id="pass"
                                    placeholder="********"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </FormGroup>
                        </Col>
                        <Button onClick={this.onLogin}>Login</Button>
                        <p>{errors}</p>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default AdminContainer
