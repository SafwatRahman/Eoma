import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ScheduleForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="eventsList">
          <Form.Control
            onChange={this.props.onChange}
            placeholder="meeting, relaxing, class, nothing, etc."
          />
          <Form.Text className="text-muted">
            Enter a comma separated list of your upcoming events
          </Form.Text>
        </Form.Group>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit">
            Find me food!
          </Button>
        </div>
      </Form>
    );
  }
}

export default ScheduleForm;
