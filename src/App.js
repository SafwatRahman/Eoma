import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Intro from "./components/intro";
import ScheduleForm from "./components/schedule";
import YelpItem from "./components/yelp-item";
//import GoogleMap from "./components/map";

// BOOTSTRAP IMPORTS
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  resetState = () => {
    this.setState({
      activitiesString: "",
      activitiesList: [],
      categories: [],
      error: "",
      buttonClicked: false,
      restaurantNames: [],
      restaurantLocations: []
    });
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
        activitiesList: this.state.activitiesString.split(",")
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
      "meeting",
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
      "performance",
      "gym",
      "working out",
      "hiking",
      "biking",
      "running",
      "athletics",
      "sports"
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
      "stress relief",
      "sleeping",
      "watching movies",
      "playing videogames",
      "videogames",
      "hanging out",
      "party",
      "gaming",
      "sex"
    ];
    const wordBanks = [productivityWordBank, leisureWordBank];

    var categories = [];
    // loop through each bank
    let categoryUpdate = new Promise((resolve, reject) => {
      for (let i = 0; i < wordBanks.length; ++i) {
        // check if bank contains activity
        for (let j = 0; j < activities.length; ++j) {
          if (wordBanks[i].includes(activities[j].toLowerCase().trim())) {
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
        this.setState({
          categories: categories,
          error: "",
          buttonClicked: true
        });
      })
      .catch(err => {
        this.setState({ categories: [], error: err, buttonClicked: true });
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
                  reset={this.resetState}
                  addRestaurantLocations={this.addRestaurantLocations}
                  addRestaurantNames={this.addRestaurantNames}
                  restaurantNames={this.state.restaurantNames}
                  toggleButton={this.toggleButton}
                  buttonClicked={this.state.buttonClicked}
                  categories={this.state.categories}
                />
              )}
              <br></br>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    ); //{this.state.restaurantLocations.length === 0 ? null : (
    //  <GoogleMap apiKey="AIzaSyCerlxJJOMYNUkZn3y9yd0TwUy07qB0vD8" />
    //)}
  }
}

export default App;
