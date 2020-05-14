import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import axios from 'axios'
import { connect } from 'react-redux'
import {
    oneKeywordForFilter,
    resetKeywords,
} from '../actions/data_fetching_actions'
import { selectorTotalItemsCart } from '../selectors/selector_list_statistics'
import CheckoutMiniSummaryPreview from '../components/Checkout/checkout_mini_summary_preview'
import {
    Container,
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavbarBrand,
    NavItem,
    Badge,
    Dropdown,
    DropdownToggle,
} from 'reactstrap'
import { loginUser } from '../actions/users_actions'
import { clearCart } from '../actions/cart_actions'

const styles = {
    itemMenu: {
        padding: '10px',
        listStyleType: 'none',
    },
    arrowDown: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '30px 18px 0 18px',
        borderColor: ' #072a48 transparent transparent transparent',
        position: 'absolute',
        zIndex: '3',
    },
    navbarBackground: {
        backgroundColor: '#072a48',
        zIndex: 3,
    },
}

const arrowStyleSubmenu = (subMenuCategorySelected, item, arrowDown) =>
    subMenuCategorySelected === item && <div style={arrowDown}></div>

class NavbarContainer extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false,
            subMenuOpen: false,
            subMenuCategorySelected: '',
            openCartPreview: false,
            isLoggedIn: null,
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    componentDidMount = async () => {
        try {
            const token = window.localStorage.getItem('token')
            const req = axios({
                method: 'get',
                url: '/api/auth',
                headers: {
                    authorization: token,
                },
            })
            const res = await req
            if (res.status == 200) {
                this.props.loginUser(true)
            } else {
                this.props.loginUser(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    onLogout = async () => {
        try {
            const token = window.localStorage.getItem('token')

            const res = axios({
                method: 'post',
                url: '/api/users/logout',
                headers: {
                    authorization: token,
                },
            })
            const response = await res
            this.props.clearCart([])
            localStorage.removeItem('token')
            this.props.loginUser(false)
        } catch (error) {
            console.log(error)
        }
    }

    redirectToSignin = () => {
        return (
            <Redirect
                to={{
                    pathname: '/signin',
                    state: { referrer: 'test' },
                }}
            />
        )
    }

    render() {
        const {
            sendOneKeyword,
            getCart,
            resetKeywords,
            totalItemsSelectorStats,
            isLoggedIn,
        } = this.props
        const { isOpen, subMenuCategorySelected, openCartPreview } = this.state
        const { itemMenu, arrowDown, navbarBackground } = styles
        const categoriesNavItems = (item) =>
            isBrowser ? (
                <NavItem style={itemMenu}>
                    <NavLink
                        to={`/productslist/${item}`}
                        className="text-black"
                        onClick={() => resetKeywords()}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>{' '}
                    {arrowStyleSubmenu(
                        subMenuCategorySelected,
                        item,
                        arrowDown
                    )}
                </NavItem>
            ) : (
                <NavItem style={itemMenu}>
                    <NavLink
                        to={`/productslist/${item}`}
                        className="text-black"
                        onClick={() => {
                            return resetKeywords(), this.toggle()
                        }}
                    >
                        {item}
                    </NavLink>
                </NavItem>
            )

        const auth =
            isLoggedIn == true ? (
                isBrowser ? (
                    <Nav
                        className="ml-auto"
                        navbar
                        style={{ cursor: 'pointer' }}
                    >
                        <NavItem>
                            <div
                                onClick={() =>
                                    this.setState({
                                        openCartPreview: !openCartPreview,
                                    })
                                }
                                className="text-black"
                            >
                                Cart &nbsp;
                                <Badge
                                    color="success"
                                    pill
                                    style={{
                                        position: 'relative',
                                        top: '-1px',
                                    }}
                                >
                                    {totalItemsSelectorStats}
                                </Badge>
                            </div>
                        </NavItem>
                        {openCartPreview && (
                            <Dropdown
                                style={{ position: 'absolute', top: '100%' }}
                            >
                                <DropdownToggle caret>
                                    <CheckoutMiniSummaryPreview
                                        empty={getCart.length === 0 && true}
                                        getCart={getCart}
                                    />
                                </DropdownToggle>
                            </Dropdown>
                        )}
                        &nbsp;
                        <Button>
                            <NavItem onClick={this.onLogout}>Logout</NavItem>
                        </Button>
                    </Nav>
                ) : (
                    <NavItem style={itemMenu}>
                        <NavLink
                            to="/cart"
                            className="text-white"
                            onClick={this.toggle}
                        >
                            cart
                        </NavLink>
                    </NavItem>
                )
            ) : (
                <Nav>
                    <Button to="/signin">
                        <NavLink to="/signin" className="text-white">
                            Login
                        </NavLink>
                    </Button>
                </Nav>
            )

        const cartNavItem = isBrowser ? (
            <Nav className="ml-auto" navbar style={{ cursor: 'pointer' }}>
                <NavItem>
                    <div
                        onClick={() =>
                            this.setState({ openCartPreview: !openCartPreview })
                        }
                        className="text-black"
                    >
                        Cart &nbsp;
                        <Badge
                            color="success"
                            pill
                            style={{ position: 'relative', top: '-1px' }}
                        >
                            {totalItemsSelectorStats}
                        </Badge>
                    </div>
                </NavItem>
                {openCartPreview && (
                    <Dropdown style={{ position: 'absolute', top: '100%' }}>
                        <DropdownToggle caret>
                            <CheckoutMiniSummaryPreview
                                empty={getCart.length === 0 && true}
                                getCart={getCart}
                            />
                        </DropdownToggle>
                    </Dropdown>
                )}
            </Nav>
        ) : (
            <NavItem style={itemMenu}>
                <NavLink
                    to="/cart"
                    className="text-white"
                    onClick={this.toggle}
                >
                    cart
                </NavLink>
            </NavItem>
        )
        return (
            <div>
                <Navbar
                    color="light"
                    light
                    expand="md"
                    style={{ boxShadow: '0 14px 6px -6px rgba(43,43,82,0.24)' }}
                >
                    <Container>
                        <NavbarBrand>
                            <NavLink to="/">BooXchange</NavLink>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                {categoriesNavItems('books')}
                                {categoriesNavItems('notes')}
                                {categoriesNavItems('tutorials')}
                            </Nav>
                            {auth}
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    categoriesProducts: state.categoriesProducts,
    getCart: state.cartReducer,
    totalItemsSelectorStats: selectorTotalItemsCart(state),
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: (x) => dispatch(loginUser(x)),
    clearCart: (x) => dispatch(clearCart(x)),
    sendOneKeyword: (x) => dispatch(oneKeywordForFilter(x)),
    resetKeywords: () => dispatch(resetKeywords()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
