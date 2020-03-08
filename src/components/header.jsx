import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

class Header extends Component {
  state = {};
  render() {
    const headerStyle = {
      float: "left",
      padding: "15px",
      textAlign: "center",
      width: "100%"
    };
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={headerStyle}>Eoma</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
