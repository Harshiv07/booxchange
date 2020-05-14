import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Button } from 'reactstrap'

const propTypes = {
    addToCart: PropTypes.func.isRequired,
    sizeBtn: PropTypes.string.isRequired,
    infoItem: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
}

const ButtonAddToCart = ({ addToCart, sizeBtn, infoItem, toggleModal }) => {
    return (
        <Fragment>
            <Button
                color={'success'}
                size={sizeBtn}
                onClick={() => {
                    return addToCart({ ...infoItem }) && toggleModal()
                }}
            >
                Add to Cart
            </Button>
        </Fragment>
    )
}

ButtonAddToCart.propTypes = propTypes

export default ButtonAddToCart
