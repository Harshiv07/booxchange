import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { ListGroup, ListGroupItem, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const propTypes = {
    getCart: PropTypes.array.isRequired,
    empty: PropTypes.bool.isRequired,
}

const CheckoutMiniSummaryPreview = ({ getCart, empty }) => {
    const styles = {
        fontSize: {
            fontSize: '13px',
        },
        centerButtons: {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px',
            textDecoration: 'none',
        },
    }

    const CardPreview = (
        <ListGroup style={{ color: 'black' }}>
            {!empty ? (
                <Fragment>
                    <ListGroupItem>
                        {getCart.map((x) => (
                            <Row key={x._id}>
                                <Col xs="9">
                                    <p style={styles.fontSize}>
                                        x{x.quantity} {x.title} Rs. {x.price}
                                    </p>
                                </Col>
                                <Col xs="3">
                                    <img
                                        style={{
                                            width: '20px',
                                            maxHeight: '50px',
                                        }}
                                        src={x.images[0]}
                                        alt=""
                                    />
                                </Col>
                            </Row>
                        ))}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to="/checkout" style={styles.centerButtons}>
                            <Button
                                className="mb-2 bg-dark text-white"
                                size="sm"
                            >
                                Check out
                            </Button>
                        </Link>
                        <Link to="/cart" style={styles.centerButtons}>
                            <Button outline color="secondary" size="sm">
                                View Cart
                            </Button>
                        </Link>
                    </ListGroupItem>
                </Fragment>
            ) : (
                <ListGroupItem>Empty card</ListGroupItem>
            )}
        </ListGroup>
    )

    return CardPreview
}

CheckoutMiniSummaryPreview.propTypes = propTypes

export default CheckoutMiniSummaryPreview
