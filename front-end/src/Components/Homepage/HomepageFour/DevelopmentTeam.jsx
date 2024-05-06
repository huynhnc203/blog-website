import React from "react";
import ProfileCard from "./ProfileCard";
import { Container, Col, Row } from "react-bootstrap";

const DevelopmentTeam = () => {
    let phuctitle = "Support Front-end programming, building software-supported AI systems"
    let huynhtitle = "Number 1 Back-end programmer in the team, mastery of building a system"
    let hungtitle = "Front-end programmer, proplayer Vanlorant, support the team in all aspects"
    let truongtitle = "Solid back-end platform, always completing assigned tasks, and supporting the team in all aspects"



    const teamMembers = [
        { name: "Huu Phuc", title: phuctitle, github: "@HwuuPhuc0904", hobby1: "football", hobby2: "coding", imgsrc: "phuc.jpg", githublink: "https://github.com/HwuuPhuc0904", facebooklink: "https://www.facebook.com/profile.php?id=100022445330487" },
        { name: "Cong Huynh", title: huynhtitle, github: "@hcn203204", hobby1: "game", hobby2: "coding", imgsrc: "huynh.jpg", githublink: "https://github.com/hnc203204", facebooklink: "https://www.facebook.com/Bii.20032306" },
        { name: "Hung Ngo", title: hungtitle, github: "@ngoduchung1801", hobby1: "javalorant", hobby2: "coding", imgsrc: "hung.jpg", githublink: "https://github.com/ngoduchung1801", facebooklink: "https://www.facebook.com/helios.ndh" },
        { name: "Truong Nguyen", title: truongtitle, github: "@TruowNguyen", hobby1: "gym", hobby2: "music", imgsrc: "truong.jpg", githublink: "https://github.com/TruowNguyen", facebooklink: "https://www.facebook.com/profile.php?id=100013502353806" },
    ];
    return (
        <>
            <Container>
                <div className="word">
                    <h1 style={{ color: "black" }}>Development Team</h1>
                </div>
                <div>
                    <Row>
                        {teamMembers.map(member => (
                            <Col key={member.name}>
                                <ProfileCard name={member.name} title={member.title} github={member.github} hobby1={member.hobby1} hobby2={member.hobby2} imgsrc={member.imgsrc} githublink={member.githublink} facebooklink={member.facebooklink} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </>

    )

}
export default DevelopmentTeam;