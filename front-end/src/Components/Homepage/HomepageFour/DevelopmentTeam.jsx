import React from "react";
import ProfileCard from "./ProfileCard";
import { Container, Col , Row } from "react-bootstrap";

const DevelopmentTeam = () => {
        let phuctitle = "Đẳng cấp số 1 VN , chơi liên quân số 2 không ai số 1 , gánh Thái, Vanh lên thách đấu"
        let huynhtitle = "Lập trình viên số 1 về HTMLOL, sinh viên của trường đại học số 1 VN UET-VNU"
        let hungtitle = "Gymer gay lọ số 1 việt nam, Sở hữu nick tik tok khủng 2 người follow"
        let truongtitle = "Đang làm việc tại tập đoàn số 1 việt nam - Vingroup . Công việc hót rác "



    const teamMembers = [
        { name: "Huu Phuc", title: phuctitle, github: "@HwuuPhuc0904", hobby1: "football" , hobby2: "coding" , imgsrc : "phuc.jpg" , githublink: "https://github.com/HwuuPhuc0904" , facebooklink: "https://www.facebook.com/profile.php?id=100022445330487"},
        { name: "Cong Huynh", title: huynhtitle,github: "@hcn203204", hobby1: "game" , hobby2: "coding" , imgsrc : "huynh.jpg" , githublink: "https://github.com/hnc203204" , facebooklink: "https://www.facebook.com/Bii.20032306"},
        { name: "Hung Ngo", title: hungtitle,github: "@ngoduchung1801", hobby1: "gym", hobby2: "playgame" , imgsrc: "hunggay.jpg" , githublink: "https://github.com/ngoduchung1801" , facebooklink: "https://www.facebook.com/helios.ndh" },
        { name: "Truong Nguyen", title: truongtitle,github: "@TruowNguyen", hobby1: "gym" ,hobby2: "music", imgsrc: "truong.jpg" , githublink: "https://github.com/TruowNguyen" , facebooklink: "https://www.facebook.com/profile.php?id=100013502353806"},
      ];
    return(
        <>
        <Container>
            <div className="word">
                <h1>Development Team</h1>
            </div>
            <div>
                <Row>
                {teamMembers.map(member => (
                    <Col key={member.name}>
                        <ProfileCard name={member.name} title={member.title} github = {member.github} hobby1={member.hobby1} hobby2 = {member.hobby2} imgsrc = {member.imgsrc} githublink={member.githublink} facebooklink={member.facebooklink}/>
                    </Col>
                ))}
                </Row>
            </div>
        </Container>
        </>

    )

}
export default DevelopmentTeam;