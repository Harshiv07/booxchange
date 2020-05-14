import React, { Component } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import analysis_ from '../static/analysis_.png'
import code from '../static/code.png'
import profile_analysis from '../static/market_analysis_.png'
import graphic_chart from '../static/graphic_chart.png'
import booklover from '../static/book_lover.svg'
import '../style/homepage.css'

class CarouselHomepage extends Component {
    constructor(props) {
        super(props)
        this.state = { activeIndex: 0 }
    }

    onExiting = () => {
        this.animating = true
    }

    onExited = () => {
        this.animating = false
    }

    goToIndex = (newIndex) => {
        if (this.animating) return
        this.setState({ activeIndex: newIndex })
    }

    render() {
        return (
            <div>
                <div className="bg">
                    <Container className="bg-container">
                        <Row className="title">
                            <Col>
                                <h1 style={{ marginTop: '50px' }}>
                                    Landing Page
                                </h1>
                                <br />
                                <p>
                                    Our landing page template works on all
                                    devices, so you only have to set it up once,
                                    and get beautiful results forever.
                                </p>
                                <Button
                                    className="block-1-btn"
                                    variant="outline-primary"
                                >
                                    Visit Your Dashboard
                                </Button>
                            </Col>

                            <Col md={4}></Col>

                            <Col md={4}>
                                <img
                                    className="title-image"
                                    src={booklover}
                                    alt={'Career'}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="block-1-wave"
                >
                    <defs>
                        <linearGradient
                            id="grad1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="00%"
                                style={{
                                    stopColor: '#e0e2e6',
                                    stopOpacity: '1',
                                }}
                            />
                            <stop
                                offset="100%"
                                style={{
                                    stopColor: '#c5c7ca',
                                    stopOpacity: '1',
                                }}
                            />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#grad1)"
                        fill-opacity="1"
                        d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,234.7C672,213,768,171,864,144C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>

                <div className="block-2-bg">
                    <Container>
                        <div class="heading">
                            <h2>Making your work easier</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                                <br /> Etiam semper diam at erat pulvinar, at
                                pulvinar felis blandit. Vestibulum volutpat
                                tellus diam, consequat gravida libero rhoncus
                                ut.
                            </p>
                        </div>

                        <Row
                            style={{
                                marginTop: '100px',
                                marginBottom: '100px',
                                minHeight: '20vh',
                            }}
                        >
                            <Col>
                                <h2>Find out where you stand!</h2>
                            </Col>
                            <Col className="block-two-col">
                                <img
                                    className="block-two-image"
                                    src={analysis_}
                                    alt={'Analysis'}
                                />
                            </Col>
                        </Row>

                        <Row
                            style={{
                                marginTop: '100px',
                                marginBottom: '100px',
                                minHeight: '20vh',
                            }}
                        >
                            <Col className="block-two-col">
                                <img
                                    className="block-two-image"
                                    src={graphic_chart}
                                    alt={'Improve'}
                                />
                            </Col>
                            <Col>
                                <h2>Improve daily!</h2>
                            </Col>
                        </Row>

                        <Row
                            style={{
                                marginTop: '100px',
                                marginBottom: '100px',
                                minHeight: '20vh',
                            }}
                        >
                            <Col>
                                <h2>Let recruiters find you!</h2>
                            </Col>
                            <Col className="block-two-col">
                                <img
                                    className="block-two-image"
                                    src={profile_analysis}
                                    alt={'Profile Analysis'}
                                />
                            </Col>
                        </Row>

                        <Row
                            style={{
                                marginTop: '100px',
                                marginBottom: '100px',
                                minHeight: '20vh',
                            }}
                        >
                            <Col className="block-two-col">
                                <img
                                    className="block-two-image"
                                    src={code}
                                    alt={'Code'}
                                />
                            </Col>
                            <Col>
                                <h2>Easy on the go access!</h2>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default CarouselHomepage
