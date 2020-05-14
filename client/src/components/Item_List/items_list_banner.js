import PropTypes from 'prop-types'
import React from 'react'
import { Container } from 'reactstrap'

const propTypes = {
    item: PropTypes.string,
    reducerPriceRangeFilter: PropTypes.number,
    sortArgsForFilter: PropTypes.string,
    sortSizeForFilter: PropTypes.string,
    keywordsForFilter: PropTypes.array,
}

const styles = {
    textBanner: {
        marginTop: '15px',
        boxShadow: '0px 3px 0px 0px black',
        color: '#007BFF',
    },
    titleH1Pc: {
        fontSize: '60px',
    },
}

const ItemsListBanner = ({
    item,
    reducerPriceRangeFilter,
    sortArgsForFilter,
    sortSizeForFilter,
    keywordsForFilter,
}) => {
    const {
        bannerCoverMenPc,
        bannerCoverMenMobile,
        bannerCoverWomenMobile,
        bannerCoverWomenPc,
        textBanner,
        titleH1Pc,
    } = styles

    return (
        <Container style={textBanner}>
            <h1 className="display-3" style={titleH1Pc}>
                {item === 'books'
                    ? 'Books'
                    : item === 'notes'
                    ? 'Handwritten Notes'
                    : 'Tutorial Sessions'}
            </h1>
        </Container>
    )
}

ItemsListBanner.propTypes = propTypes

export default ItemsListBanner
