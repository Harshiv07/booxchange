import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import AdminModalUpdate from './admin_modal_update'
import AdminFormDeleteItem from './admin_form_delete_item'

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiList: [],
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/api/productsdata')
            const apiList = await response.data
            this.setState({ apiList })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { stylesTab2 } = this.props
        const { apiList } = this.state
        return (
            <Table responsive striped bordered hover size="sm" id="items-list">
                <thead style={stylesTab2}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Id</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Tags</th>
                        <th>Images</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {apiList.map((x, index) => (
                        <tr key={x._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{x.title}</td>
                            <td>{x._id}</td>
                            <td>Rs. {x.price}</td>
                            <td>{x.author}</td>
                            <td>{x.tags}</td>
                            <td>{x.images.length}</td>
                            <td>{x.description.substring(0, 30) + '... '}</td>
                            <td>
                                <AdminModalUpdate infos={x} />
                            </td>
                            <td>
                                <AdminFormDeleteItem
                                    id={x._id}
                                    title={x.title}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}
