import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Empty from './components/empty'
import Loadable from 'react-loadable'
import NavbarContainer from './containers/navbar_container'
import Footer from './components/footer'
import './style/transition.css'

const Loading = () => <div style={{ height: '1000px' }}></div>

const ItemContainer = Loadable({
    loader: () => import('./containers/item_container'),
    loading: Loading,
})

const CheckoutContainer = Loadable({
    loader: () => import('./containers/checkout_contianer'),
    loading: Loading,
})

const CartContainer = Loadable({
    loader: () => import('./containers/cart_container'),
    loading: Loading,
})

const HomepageContainer = Loadable({
    loader: () => import('./containers/homepage_container'),
    loading: Loading,
})

const ItemsListContainer = Loadable({
    loader: () => import('./containers/items_list_container'),
    loading: Loading,
})

const ItemsListItemHomepage = Loadable({
    loader: () => import('./components/Item_List/items_list_item_homepage'),
    loading: Loading,
})

const AdminContainer = Loadable({
    loader: () => import('./containers/admin_container'),
    loading: Loading,
})

const Secret = Loadable({
    loader: () => import('./components/Admin/secret'),
    loading: Loading,
})

const SigninContainer = Loadable({
    loader: () => import('./containers/signin_container'),
    loading: Loading,
})

const Router = () => (
    <div>
        <NavbarContainer />
        <Switch>
            <Route exact path="/" component={HomepageContainer} />
            <Route exact path="/productslist" component={ItemsListContainer} />
            <Route exact path="/item/:id/:item" component={ItemContainer} />
            <Route exact path="/checkout" component={CheckoutContainer} />
            <Route exact path="/cart" component={CartContainer} />
            <Route
                exact
                path="/productslist/:item"
                component={ItemsListContainer}
            />
            <Route
                exact
                path="/category/:item"
                component={ItemsListItemHomepage}
            />
            <Route exact path="/admin" component={AdminContainer} />
            <Route exact path="/dashboard" component={Secret} />
            <Route exact path="/signin" component={SigninContainer} />
            <Route component={Empty} />
        </Switch>
        <Footer />
    </div>
)

export default Router
