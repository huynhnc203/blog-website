import React from 'react';
import CardBlog from './CardBlog';
import { Container, Row, Col } from 'react-bootstrap';

const FeaturePost = () => {
    return (
        <Container>
            <div className='Title'>
                <h2 style={{ marginRight: '960px' }}>Featured Posts</h2>
            </div>
            <Row>
                <Col><CardBlog /></Col>
                <Col><CardBlog /></Col>
                <Col><CardBlog /></Col>
                <Col><CardBlog /></Col>
            </Row>
        </Container>
    )


}
export default FeaturePost;