import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Admin from './admin'

class Secret extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorization: false,
            apiAuth: false,
        }
    }

    async componentDidMount() {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/admin/auth',
                headers: { Authorization: localStorage.getItem('adminID') },
            })
            const apiAuth = await response.data.authorization
            console.log(response)
            this.setState({ apiAuth })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const showAdminPanel = this.state.apiAuth ? (
            <Admin />
        ) : (
            <h2
                style={{
                    minHeight: '80vh',
                    textAlign: 'center',
                    marginTop: '30px',
                }}
            >
                Authorization is required, please login here:{' '}
                <Link to="/admin">login</Link> or Refresh the page
            </h2>
        )

        return <div>{showAdminPanel}</div>
    }
}

export default Secret
