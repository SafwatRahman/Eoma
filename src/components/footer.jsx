import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

class Footer extends Component {
  state = {};
  render() {
    const body = {
      minHeight: "80vh"
    };

    const footerStyle = {
      float: "left",
      padding: "15px",
      textAlign: "center",
      width: "100%"
    };
    return (
      <React.Fragment>
        <div style={body} className="d-flex flex-column">
          <Navbar fixed="bottom" bg="light" expand="lg">
            <Navbar.Brand style={footerStyle}></Navbar.Brand>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
