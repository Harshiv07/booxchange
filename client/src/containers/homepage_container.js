import React from 'react'
import { Helmet } from 'react-helmet'
import CarouselHomepage from '../components/homepage'

const styles = { marginTop: '-33px' }

const Homepage = () => (
    <div>
        <Helmet>
            <title>BooXchange 2020</title>
            <meta name="description" content="BooXchange 2020" />
        </Helmet>
        <div style={styles}>
            <CarouselHomepage />
        </div>
    </div>
)

export default Homepage
