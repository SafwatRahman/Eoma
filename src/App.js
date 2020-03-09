import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Intro from "./components/intro";
import ScheduleForm from "./components/schedule";
// BOOTSTRAP IMPORTS
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import YelpItem from "./components/yelp-item";

class App extends Component {
  state = {
    activitiesString: "",
    activitiesList: [],
    categories: null,
    error: "",
    buttonClicked: false,
    restaurantNames: [],
    restaurantLocations: []
  };

  addRestaurantNames = names => {
    this.setState({
      restaurantNames: names
    });
  };
  addRestaurantLocations = locations => {
    this.setState({
      restaurantLocations: locations
    });
  };
  handleChange = event => {
    this.setState({
      activitiesString: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.setState(
      {
        activitiesList: this.state.activitiesString.split(","),
        buttonClicked: true
      },
      () => {
        this.findFoodCategory(this.state.activitiesList);
      }
    );
  };
  findFoodCategory = activities => {
    const productivityWordBank = [
      "work",
      "working",
      "busy",
      "employment",
      "laboring",
      "job",
      "tasks",
      "homework",
      "assignment",
      "studying",
      "writing",
      "thinking",
      "reading",
      "emails",
      "lecture",
      "class",
      "school",
      "meeting"
    ];
    const leisureWordBank = [
      "relaxing",
      "free",
      "nothing",
      "netflix",
      "chilling",
      "holiday",
      "treating myself",
      "break",
      "unemployed",
      "bored",
      "tv",
      "stress relief"
    ];
    const stressWordBank = [
      "exam",
      "test",
      "presentation",
      "interview",
      "phone interview",
      "finals",
      "midterm",
      "final",
      "midterms",
      "first date",
      "performance"
    ];
    const wordBanks = [productivityWordBank, leisureWordBank, stressWordBank];

    var categories = [];
    // loop through each bank
    let categoryUpdate = new Promise((resolve, reject) => {
      for (let i = 0; i < wordBanks.length; ++i) {
        // check if bank contains activity
        for (let j = 0; j < activities.length; ++j) {
          if (wordBanks[i].includes(activities[j].trim())) {
            categories.push(i); // record which bank the activity belongs to
            break; // if found, move to next bank
          } else {
            continue; // else, continue searching
          }
        }
      }
      if (categories.length > 0) {
        resolve(categories);
      } else {
        reject(
          "Your listed activities did not match those listed in ours. Please try again."
        );
      }
    });

    categoryUpdate
      .then(categories => {
        this.setState({ categories: categories, error: "" });
      })
      .catch(err => {
        this.setState({ categories: [], error: err });
      });
  };
  toggleButton = () => {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Intro />
              <ScheduleForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
              {this.state.categories === null ? null : (
                <YelpItem
                  addRestaurantLocations={this.addRestaurantLocations}
                  addRestaurantNames={this.addRestaurantNames}
                  toggleButton={this.toggleButton}
                  buttonClicked={this.state.buttonClicked}
                  categories={this.state.categories}
                />
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
