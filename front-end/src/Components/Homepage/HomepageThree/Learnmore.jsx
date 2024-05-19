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
                        <Col><ExplainCard content = "#Review" title = "Asus ROG Ally X sẽ có giá 799 USD, 1TB SSD, chỉ có lựa chọn Ryzen Z1 Extreme" linkpic = "rogally.png" link="https://www.youtube.com/watch?v=_MLWZTaWRtA"/></Col>
                        <Col><ExplainCard content = "#New" title = "Tổng hợp review iPad Pro M4: thời lượng pin tốt hơn, màn hình OLED rất đẹp," linkpic = "prom4.png" link = "https://www.youtube.com/watch?v=Kt3eclhe6r4"/></Col>
                        <Col><ExplainCard content = "#Learn" title = "Khắc phục vấn đề không thể mở file bằng cách double-click trên macOS" linkpic = 'macos.png' link ="https://www.youtube.com/watch?v=QrJkmTKuCD4" /></Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}
export default Learnmore;