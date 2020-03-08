import React from "react";
import "./App.css";
import Header from "./components/header";
import Intro from "./components/intro";
import ScheduleForm from "./components/schedule";
// BOOTSTRAP IMPORTS
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Intro />
            <ScheduleForm />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
