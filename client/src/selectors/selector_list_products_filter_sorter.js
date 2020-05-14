import { createSelector } from 'reselect'

const listToFilter = (state) => state.listFetchDataSuccess
const argsForFilter = (state) => state.keywordsForFilter
const sortForFilter = (state) => state.sortArgsForFilter
const getAll = (state) => state.sortAllForFilter
const getPriceRange = (state) => state.reducerPriceRangeFilter

const getFilteredList = (
    listFetchDataSuccess,
    keywordsForFilter,
    sortArgsForFilter,
    sortAllForFilter,
    reducerPriceRangeFilter
) => {
    const FilteredListByKeywords = listFetchDataSuccess.filter((x) =>
        keywordsForFilter.some((el) => x.tags.includes(el))
    )

    const FilteredListBySize =
        sortAllForFilter === 'All'
            ? FilteredListByKeywords
            : FilteredListByKeywords.filter((y) =>
                  y.all.includes(sortAllForFilter)
              )

    const FilteredListByPriceRange = FilteredListBySize.filter(
        (x) => x.price <= reducerPriceRangeFilter
    )

    return FilteredListByPriceRange.sort((a, b) => {
        switch (sortArgsForFilter) {
            case 'titleAsc':
                if (a.title > b.title) return 1
                if (a.title < b.title) return -1

            case 'titleDesc':
                if (a.title < b.title) return 1
                if (a.title > b.title) return -1

            case 'priceAsc':
                if (a.price > b.price) return 1
                if (a.price < b.price) return -1

            case 'priceDesc':
                if (a.price < b.price) return 1
                if (a.price > b.price) return -1

            default:
                if (a.title > b.title) return 1
                if (a.title < b.title) return -1
        }
    })
}

export const selectorListFilterSorter = createSelector(
    listToFilter,
    argsForFilter,
    sortForFilter,
    getAll,
    getPriceRange,
    getFilteredList
)
