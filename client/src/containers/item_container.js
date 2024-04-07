import React, { Component } from 'react'
import { fetchItemApi } from '../actions/data_fetching_actions'
import { addToCart } from '../actions/cart_actions'
import { connect } from 'react-redux'
import Item from '../components/Item/item'

class ItemContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () =>
        this.props.fetchItemApi(
            process.env.REACT_APP_SERVER +
                `/api/productsdata/${this.props.match.params.id}`
        )

    render = () => <Item {...this.props} {...this.state} />
}

const mapStateToProps = (state) => ({
    infoItem: state.itemFetchDataSuccess,
    loading: state.itemIsLoading,
    errorFetching: state.itemHasErrorm,
})

const mapDispatchToProps = (dispatch) => ({
    fetchItemApi: (url) => dispatch(fetchItemApi(url)),
    addToCart: (x) => dispatch(addToCart(x)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
