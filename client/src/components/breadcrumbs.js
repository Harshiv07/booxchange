import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import ButtonFilterMobile from './Item_List/button_filter_mobile'

const propTypes = {
    item: PropTypes.string,
    selectedCategory: PropTypes.array,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    marginTop: PropTypes.number,
    showSortBtn: PropTypes.bool,
    showFilterBtn: PropTypes.bool,
    dispatchToSortList: PropTypes.func,
    sortArgsForFilter: PropTypes.string,
    dispatchSize: PropTypes.func,
    sortSizeForFilter: PropTypes.string,
    keywordsSelectAction: PropTypes.func,
    categoriesProducts: PropTypes.object,
    keywordsForFilter: PropTypes.array,
    actionPriceRangeFilter: PropTypes.func,
    reducerPriceRangeFilter: PropTypes.number,
    listLength: PropTypes.number,
}

const Breadcrumbs = ({
    item,
    selectedCategory,
    backgroundColor,
    textColor,
    marginTop,
    showSortBtn,
    showFilterBtn,
    dispatchSize,
    sortSizeForFilter,
    keywordsSelectAction,
    categoriesProducts,
    keywordsForFilter,
    actionPriceRangeFilter,
    reducerPriceRangeFilter,
    listLength,
}) => {
    const styles = {
        containerPcScreen: {
            height: '80px',
            backgroundColor: backgroundColor,
            marginTop: marginTop,
            color: textColor,
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
        },
        containerMobileScreen: {
            height: '100px',
            backgroundColor: backgroundColor,
            marginTop: marginTop,
            color: textColor,
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
        },
        sortBtnMobileScreen: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        linkColor: {
            color: textColor,
        },
    }

    const sortBtn = showSortBtn && (
        <Col
            sm={{ size: 'auto', offset: 6 }}
            style={styles.sortBtnMobileScreen}
        >
            {showFilterBtn && (
                <ButtonFilterMobile
                    buttonLabel="Filter the list"
                    item={item}
                    dispatchSize={dispatchSize}
                    sortSizeForFilter={sortSizeForFilter}
                    keywordsSelectAction={keywordsSelectAction}
                    keywordsForFilter={keywordsForFilter}
                    categoriesProducts={categoriesProducts}
                    actionPriceRangeFilter={actionPriceRangeFilter}
                    reducerPriceRangeFilter={reducerPriceRangeFilter}
                    listLength={listLength}
                />
            )}
        </Col>
    )

    const itemLink = item && (
        <Fragment>
            <Link style={styles.linkColor} to={`/category/${item}`}>{` ${
                item && item.charAt(0).toUpperCase() + item.substr(1)
            }'s Apparels`}</Link>{' '}
            >
        </Fragment>
    )
    const selectedItem =
        selectedCategory.length === 1
            ? ' ' + selectedCategory
            : selectedCategory.length > 1
            ? ' Multiple criterias'
            : ' Category selection'
    return (
        <div
            style={
                isMobile
                    ? styles.containerMobileScreen
                    : styles.containerPcScreen
            }
        >
            <Container>
                <Row>
                    <Col sm={{ size: 'auto' }}>
                        <div>
                            <Link style={styles.linkColor} to="/">
                                Home{' '}
                            </Link>{' '}
                            >{itemLink}
                            <span>{selectedItem}</span>
                        </div>
                    </Col>
                    {sortBtn}
                </Row>
            </Container>
        </div>
    )
}

Breadcrumbs.propTypes = propTypes

export default Breadcrumbs
