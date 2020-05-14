import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import Breadcrumbs from '../breadcrumbs'
import { Col, Row, Container } from 'reactstrap'
import StarRatings from 'react-star-ratings'
import ButtonAddToCart from './button_add_to_cart'
import CheckoutModal from '../Checkout/checkout_modal'
import CarouselItemPage from './carousel_item'

const propTypes = {
    infoItem: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errorFetching: PropTypes.bool,
    totalItemsSelectorStats: PropTypes.number.isRequired,
}

const styles = {
    marginTop: '20px',
}

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedImage: 0,
            openModal: false,
        }
    }

    toggleModal = () => this.setState({ openModal: !this.state.openModal })

    render() {
        const {
            infoItem,
            loading,
            errorFetching,
            addToCart,
            totalItemsSelectorStats,
        } = this.props

        const { selectedImage } = this.state

        if (errorFetching) {
            return <p>Sorry! There was an error loading the items</p>
        }

        const { images, tags } = infoItem
        if (loading || images === undefined || tags === undefined) {
            return <div style={{ height: '1000px' }} />
        }
        const thumbnailsBrowersView = infoItem.images.map((x, index) => (
            <div key={x} style={{ padding: '5px' }}>
                <img
                    onMouseEnter={() => this.setState({ selectedImage: index })}
                    src={infoItem.images[index]}
                    alt="Smiley face"
                    width="50px"
                    height="70px"
                    style={{ cursor: 'pointer' }}
                />
            </div>
        ))
        const MainImageBrowserView = (
            <img
                style={{ maxHeight: '500px', maxWidth: '350px' }}
                src={infoItem.images[selectedImage]}
                alt="Smiley face"
            />
        )
        const MainImageMobileView = (
            <CarouselItemPage imgsArray={infoItem.images} />
        )

        return (
            <div style={{ minHeight: '80vh' }}>
                <Breadcrumbs
                    selectedCategory={infoItem.tags}
                    backgroundColor={'white'}
                    textColor={'black'}
                />
                <Container
                    style={{ paddingTop: '50px', paddingBottom: '80px' }}
                >
                    <Row>
                        <Col md="1">{isBrowser && thumbnailsBrowersView}</Col>
                        <Col md="6">
                            {isBrowser
                                ? MainImageBrowserView
                                : MainImageMobileView}
                        </Col>
                        <Col md="5">
                            <h1>{infoItem.title}</h1>
                            <div>Rs. {infoItem.price}</div>
                            <StarRatings
                                rating={infoItem.rating}
                                starDimension="15px"
                                starSpacing="1px"
                                starRatedColor="#072a48"
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                name="rating"
                            />

                            <div style={styles}>
                                <ButtonAddToCart
                                    sizeBtn="lg"
                                    addToCart={addToCart}
                                    infoItem={infoItem}
                                    toggleModal={this.toggleModal}
                                />
                            </div>
                            <CheckoutModal
                                openModal={this.state.openModal}
                                toggleModal={this.toggleModal}
                                infoItem={infoItem}
                                totalItemsSelectorStats={
                                    totalItemsSelectorStats
                                }
                            />
                            <p style={{ paddingTop: '30px' }}>Description:</p>
                            <p>{infoItem.description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Item.propTypes = propTypes

export default Item
