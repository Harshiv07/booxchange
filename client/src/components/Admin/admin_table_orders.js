import React, { Component } from 'react'
import axios from 'axios'
import { Button, Table } from 'reactstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default class AdminTableOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiList: [],
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/api/orders')
            const apiList = await response.data
            this.setState({ apiList })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { stylesTab1 } = this.props
        const { apiList } = this.state
        return (
            <div>
                <Button style={{ float: 'right' }}>
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="items-list"
                        filename="orders-list"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                    />
                </Button>
                <Table responsive striped hover size="lg" id="items-list">
                    <thead style={stylesTab1}>
                        <tr>
                            <th style={{ width: '3%' }}>#</th>
                            <th style={{ width: '9%' }}>Id</th>
                            <th style={{ width: '7%' }}>Ref</th>
                            <th style={{ width: '5%' }}>Date</th>
                            <th style={{ width: '13%' }}>Order</th>
                            <th style={{ width: '6%' }}>Order Amount</th>
                            <th style={{ width: '6%' }}>Delivery Amount</th>
                            <th style={{ width: '8%' }}>Email</th>
                            <th style={{ width: '8%' }}>Last Name</th>
                            <th style={{ width: '8%' }}>First Name</th>
                            <th style={{ width: '6%' }}>Postal Code</th>
                            <th style={{ width: '8%' }}>Phone Number</th>
                            <th style={{ width: '13%' }}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiList.map((x, index) => (
                            <tr key={x._id}>
                                <th scope="row" style={{ width: '3%' }}>
                                    {index + 1}
                                </th>
                                <td style={{ width: '9%' }}>{x._id}</td>
                                <td style={{ width: '7%' }}>{x.ref}</td>
                                <td style={{ width: '5%' }}>{x.createdAt}</td>
                                <td style={{ width: '13%' }}>
                                    {x.order.map((item) => (
                                        <div>{`x${item.quantity}(${item.titleItem} ${item.price}$) `}</div>
                                    ))}
                                </td>
                                <td style={{ width: '6%' }}>
                                    {'Rs. ' + x.totalAmount}
                                </td>
                                <td style={{ width: '6%' }}>
                                    {'Rs. ' + x.totalDelivery}
                                </td>
                                <td style={{ width: '8%' }}>
                                    {x.customerinfo.email}
                                </td>
                                <td style={{ width: '8%' }}>
                                    {x.customerinfo.lastName}
                                </td>
                                <td style={{ width: '8%' }}>
                                    {x.customerinfo.firstName}
                                </td>
                                <td style={{ width: '8%' }}>
                                    {x.customerinfo.postalCode}
                                </td>
                                <td style={{ width: '8%' }}>
                                    {x.customerinfo.phoneNumber}
                                </td>
                                <td style={{ width: '13%' }}>
                                    {x.customerinfo.address1}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
