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
                                    BooXchange
                                </h1>
                                <br />
                                <p>
                                    The goal of BooXchange is to make the
                                    process of learning very easy and
                                    hassle-free. We provide a platform through
                                    which people can exchange knowledge easily.
                                    Join us in this process of making knowledge
                                    easily available
                                </p>
                                {/* <Button
                                    className="block-1-btn"
                                    variant="outline-primary"
                                >
                                    Visit Your Dashboard
                                </Button> */}
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
                            <h2>Making knowledge easily available</h2>
                            <p>
                                We make the process of learning easy by creating
                                a platform where people can exchange their notes
                                and books with others.
                                <br />
                                We aim to form a community of people who are
                                eager to learn and share their knowledge with
                                others
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
                                <h2>Learning Process made hassle free!</h2>
                                <br />
                                <p>
                                    Through our platform you can get the books,
                                    notes and tutorials just by following a few
                                    simple steps. The process is hassle free as
                                    you can get the required material just by
                                    selecting the order and the material will be
                                    delivered to your doorstep
                                </p>
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
                                <h2>Learning process at an affordable rate!</h2>
                                <br />
                                <p>
                                    No learner should have to worry about the
                                    cost to gain knowledge
                                    <br />
                                    <br />
                                    We at BooXchange believe a learner’s
                                    curiosity should not be stopped due to any
                                    barrier, and definitely not because of money
                                </p>
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
                                <h2>Learning process made quick!</h2>
                                <br />
                                <p>
                                    We aim to deliver any material ordered in a
                                    day so that the learner does not have to
                                    waste time.
                                </p>
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
                                <h2>Benefits of being a “BooXchanger” !</h2>
                                <br />
                                <p>
                                    <ul>
                                        <li>
                                            You can get books and notes at lower
                                            cost
                                        </li>
                                        <li>You can earn Quick cash</li>
                                        <li>
                                            You can be a part of a larger
                                            community
                                        </li>
                                        <li>
                                            You can get books during emergency
                                        </li>
                                    </ul>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default CarouselHomepage
