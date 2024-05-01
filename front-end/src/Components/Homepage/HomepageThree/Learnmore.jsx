import React from "react";
import ExplainCard from "./ExplainCard";
import { Container, Row, Col } from 'react-bootstrap';
import "./Learnmore.css";

const Learnmore = () => {
    return (
        <>
            <Container>
                <div className="title">
                    <h2>Discover and learn more on our website</h2>
                </div>
                <div className="list-card">
                    <Row>
                        <Col><ExplainCard /></Col>
                        <Col><ExplainCard /></Col>
                        <Col><ExplainCard /></Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}
export default Learnmore;