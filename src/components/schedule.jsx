import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ScheduleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsString: "",
      eventsList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      eventsString: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      eventsList: this.state.eventsString.split(",")
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="eventsList">
          <Form.Control
            onChange={this.handleChange}
            placeholder="meeting, relaxing, class, etc."
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
