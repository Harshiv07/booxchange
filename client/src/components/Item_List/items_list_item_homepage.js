import React from 'react'
import { connect } from 'react-redux'
import { oneKeywordForFilter } from '../../actions/data_fetching_actions'
import { Col, Container } from 'reactstrap'

const ItemsListItemHomepage = (props) => {
    const { item } = props.match.params
    const { oneKeywordForFilter } = props
    return (
        <Container style={{ paddingTop: '30px', paddingBottom: '50px' }}>
            <Col md="12">
                <h1
                    style={{
                        fontSize: '40px',
                        textAlign: 'center',
                        padding: '20px',
                    }}
                >
                    {item.charAt(0).toUpperCase() + item.slice(1)} selection
                </h1>
            </Col>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    oneKeywordForFilter: (x) => dispatch(oneKeywordForFilter(x)),
})
const mapStateToProps = (state) => ({
    oneKeywordForFilter: state.oneKeywordForFilter,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemsListItemHomepage)
