import PropTypes from 'prop-types'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import ItemsListBanner from './items_list_banner'
import ItemsListSidebar from './items_list_sidebar'
import Paginator from '../paginator'
import EachItemInList from './each_item_in_list'
import LoadingGif from '../loading_gif'
import { Container, Row, Col } from 'reactstrap'

const propTypes = {
    listIsLoading: PropTypes.bool.isRequired,
    FilteredSortedList: PropTypes.array.isRequired,
    keywordsForFilter: PropTypes.array.isRequired,
    oneKeywordForFilter: PropTypes.func.isRequired,
    currentPageHandler: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsMaxPage: PropTypes.number.isRequired,
    dispatchSize: PropTypes.func.isRequired,
    sortSizeForFilter: PropTypes.string.isRequired,
    sortArgsForFilter: PropTypes.string.isRequired,
    dispatchToSortList: PropTypes.func.isRequired,
    keywordsSelectAction: PropTypes.func.isRequired,
    categoriesProducts: PropTypes.object.isRequired,
    actionPriceRangeFilter: PropTypes.func.isRequired,
    reducerPriceRangeFilter: PropTypes.number.isRequired,
    actionFillFilters: PropTypes.func.isRequired,
}

const styles = {
    spaceColumn: {
        marginLeft: '25px',
        marginRight: '25px',
        marginBottom: '50px',
    },
    fontSize: {
        fontSize: '15px',
    },
    marginLeftBtn: {
        marginLeft: '30px',
    },
    containerPaddingTop: {
        paddingTop: '35px',
    },
}

const ItemsList = ({
    match,
    listIsLoading,
    FilteredSortedList,
    keywordsForFilter,
    oneKeywordForFilter,
    currentPageHandler,
    currentPage,
    itemsMaxPage,
    dispatchSize,
    sortSizeForFilter,
    sortArgsForFilter,
    dispatchToSortList,
    keywordsSelectAction,
    categoriesProducts,
    actionPriceRangeFilter,
    reducerPriceRangeFilter,
    actionFillFilters,
}) => {
    const { item } = match.params
    const listLength = FilteredSortedList.length

    const loading_logic = listIsLoading && <LoadingGif />

    const pagination =
        Math.ceil(listLength / itemsMaxPage) > 1 ? (
            <Paginator
                maxPages={Math.ceil(listLength / itemsMaxPage)}
                currentPage={currentPage}
                itemsMaxPage={itemsMaxPage}
                onPageChange={currentPageHandler}
            />
        ) : (
            currentPage > 1 && (() => currentPageHandler('empty'))()
        )

    const itemsListByItem_logic = (
        <Col md={{ size: 9, order: 1 }}>
            <br />
            {listIsLoading === false && <i>Results: {listLength}</i>}
            <hr />
            <br />
            <Row>
                {loading_logic}
                <EachItemInList
                    FilteredSortedList={FilteredSortedList}
                    currentPage={currentPage}
                    itemsMaxPage={itemsMaxPage}
                    currentPageHandler={currentPageHandler}
                    listIsLoading={listIsLoading}
                />
            </Row>
            {pagination}
        </Col>
    )

    const sideBar = isBrowser && (
        <Col md="3" xs="12">
            <Row>
                <ItemsListSidebar
                    keywordsForFilter={keywordsForFilter}
                    dispatchSize={dispatchSize}
                    sortSizeForFilter={sortSizeForFilter}
                    keywordsSelectAction={keywordsSelectAction}
                    categoriesProducts={categoriesProducts}
                    actionPriceRangeFilter={actionPriceRangeFilter}
                    reducerPriceRangeFilter={reducerPriceRangeFilter}
                    oneKeywordForFilter={oneKeywordForFilter}
                    item={item}
                    actionFillFilters={actionFillFilters}
                />
            </Row>
        </Col>
    )

    return (
        <div style={{ minHeight: '80vh' }}>
            <ItemsListBanner
                item={item}
                reducerPriceRangeFilter={reducerPriceRangeFilter}
                sortSizeForFilter={sortSizeForFilter}
                keywordsForFilter={keywordsForFilter}
                sortArgsForFilter={sortArgsForFilter}
            />

            <Container style={styles.containerPaddingTop}>
                <Row>
                    {itemsListByItem_logic}
                    {sideBar}
                </Row>
            </Container>
        </div>
    )
}

ItemsList.propTypes = propTypes

export default ItemsList
