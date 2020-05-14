import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../../style/checkbox.min.css'

const propTypes = {
    item: PropTypes.string.isRequired,
    keywordsSelectAction: PropTypes.func.isRequired,
    categoriesProducts: PropTypes.object.isRequired,
    keywordsForFilter: PropTypes.array.isRequired,
}

class ItemsListFilterKeywords extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: this.props.categoriesProductslength === 0,
        }
    }

    componentDidMount = () => {
        const {
            keywordsForFilter,
            actionFillFilters,
            categoriesProducts,
            item,
        } = this.props
        keywordsForFilter.length === 0
            ? item === 'books'
                ? (() => {
                      actionFillFilters(categoriesProducts.books)
                  })()
                : item === 'notes'
                ? (() => {
                      actionFillFilters(categoriesProducts.notes)
                  })()
                : (() => {
                      actionFillFilters(categoriesProducts.tutorials)
                  })()
            : console.log('item err')
    }

    render() {
        const {
            categoriesProducts,
            keywordsSelectAction,
            keywordsForFilter,
            item,
        } = this.props

        const cat = () =>
            item === 'books'
                ? categoriesProducts.books
                : item === 'notes'
                ? categoriesProducts.notes
                : categoriesProducts.tutorials
        const stateIncludesCategory = (category) =>
            keywordsForFilter.includes(category)

        return cat().map((x) => (
            <li style={{ listStyleType: 'none' }} key={x}>
                <div className="pretty p-default p-smooth">
                    {/* Empty onChange to avoid unrelevant msg error */}
                    <input
                        type="checkbox"
                        onClick={() => keywordsSelectAction(x)}
                        checked={stateIncludesCategory(x)}
                        onChange={() => {}}
                    />
                    <div className="state p-success-o">
                        <label>{x}</label>
                    </div>
                </div>
            </li>
        ))
    }
}

ItemsListFilterKeywords.propTypes = propTypes

export default ItemsListFilterKeywords
