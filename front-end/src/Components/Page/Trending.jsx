import React from 'react';
import TrendingPost from './TrendingPost';
import { Container, Row, Col } from 'react-bootstrap';

const Trending = () => {
    return (
        <Container>
            <div className='Title'>
                <h2>Trending Posts</h2>
            </div>
            <Row>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
            </Row>
            <div style={{ marginBottom: '20px' }}></div>
            <Row>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
                <Col><TrendingPost /></Col>
            </Row>
        </Container>
    )


}
export default Trending;