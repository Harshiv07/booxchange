import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const styles = {
    backgroundColor: 'white',
    paddingTop: '50px',
    paddingBottom: '50px',
    color: 'black',
    textAlign: 'center',
    boxShadow: '0px -8px 6px rgba(43,43,82,0.24)',
}

const Footer = () => (
    <div style={styles}>
        <Container>
            <Row>
                <Col
                    md="12"
                    style={{ textAlign: 'center', paddingBottom: '20px' }}
                >
                    <b>BooXchange</b>
                </Col>
            </Row>
            <Row>
                <Col md="12" style={{ textAlign: 'left', paddingTop: '20px' }}>
                    Copyright your website © 2020 All Rights Reserved
                </Col>
            </Row>
        </Container>
    </div>
)

export default Footer
