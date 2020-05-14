import PropTypes from 'prop-types'
import React from 'react'
import ItemsListFilterKeywords from './item_list_filter_keywords'
import ProductListFilterPriceBar from './item_list_filter_pricebar'

const propTypes = {
    item: PropTypes.string.isRequired,
    dispatchSize: PropTypes.func.isRequired,
    sortSizeForFilter: PropTypes.string.isRequired,
    keywordsSelectAction: PropTypes.func.isRequired,
    keywordsForFilter: PropTypes.array.isRequired,
    categoriesProducts: PropTypes.object.isRequired,
    actionPriceRangeFilter: PropTypes.func.isRequired,
    reducerPriceRangeFilter: PropTypes.number.isRequired,
    oneKeywordForFilter: PropTypes.func.isRequired,
    actionFillFilters: PropTypes.func.isRequired,
}

const styles = {
    subTitles: {
        color: 'grey',
        marginTop: '20px',
    },
}

const ItemsListSidebar = ({
    item,
    keywordsSelectAction,
    keywordsForFilter,
    categoriesProducts,
    actionPriceRangeFilter,
    reducerPriceRangeFilter,
    oneKeywordForFilter,
    actionFillFilters,
}) => (
    <div>
        <h4 style={styles.subTitles}>Categories</h4>
        <ItemsListFilterKeywords
            item={item}
            keywordsForFilter={keywordsForFilter}
            keywordsSelectAction={keywordsSelectAction}
            categoriesProducts={categoriesProducts}
            oneKeywordForFilter={oneKeywordForFilter}
            actionFillFilters={actionFillFilters}
        />
        <h4 style={styles.subTitles}>
            Price {`< Rs. ${reducerPriceRangeFilter}`}
        </h4>
        <ProductListFilterPriceBar
            actionPriceRangeFilter={actionPriceRangeFilter}
            reducerPriceRangeFilter={reducerPriceRangeFilter}
        />
    </div>
)

ItemsListSidebar.propTypes = propTypes

export default ItemsListSidebar
