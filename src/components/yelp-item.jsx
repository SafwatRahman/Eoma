import React, { Component } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

class YelpItem extends Component {
  state = {
    restaurantNames: []
  };

  async fetchResponse(category) {
    var categories = "";
    if (category === 0) {
      categories =
        "french,japanese,korean,raw_food,opensandwiches,rotisserie_chicken,salad,sandwiches,seafood,sushi,vegan,vegetarian";
    } else if (category === 1) {
      categories =
        "african,arabian,breakfast_brunch,burgers,chicken_wings,chinese,comfortfood,hotdogs,greek,halal,indian,italian,kebab,mexican,mideastern,pizza,soulfood,thai";
    } else if (category === 2) {
      categories = "opensandwiches,vegetarian,salad";
    } else {
      return null;
    }
    var herokuCors = "https://cors-anywhere.herokuapp.com/";
    var token =
      "Bearer UWiqua6ixuPdUltcuWlZA6hLhotDLXq1CbDnLzf44kw9bWJkTlX-DBc1COu68AAape4J8z_WTN5J4aSKNa2-0qp1H04UcNaxJk70hkVZ7IwqLk4C3bRFXN2Hn7dlXnYx";
    var yelpSearchUrl =
      herokuCors + "https://api.yelp.com/v3/businesses/search";
    axios
      .get(yelpSearchUrl, {
        headers: {
          Authorization: token
        },
        params: {
          location: 53715,
          categories: categories,
          sort_by: "distance"
        }
      })
      .then(res => {
        var i = Math.floor(Math.random() * 5);
        var j = Math.floor(Math.random() * 6) + 5;
        var k = Math.floor(Math.random() * 8) + 12;
        var names = [
          res.data.businesses[i].name,
          res.data.businesses[j].name,
          res.data.businesses[k].name
        ];
        var locations = [
          res.data.businesses[i].location.address1,
          res.data.businesses[j].location.address1,
          res.data.businesses[k].location.address1
        ];
        this.props.addRestaurantNames(names);
        this.props.addRestaurantLocations(locations);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = () => {
    this.fetchResponse(this.props.categories[0]);
    this.props.toggleButton();
  };
  componentDidUpdate = () => {
    if (this.props.buttonClicked) {
      this.fetchResponse(this.props.categories[0]).then(data => {
        console.log(data);
      });
      this.props.toggleButton();
    }
  };
  render() {
    const categories = this.props.categories;
    return (
      <div>
        {categories.length !== 0 ? (
          <React.Fragment>
            <br></br>
            <ListGroup>
              <ListGroup.Item>{this.props.restaurantNames[0]}</ListGroup.Item>
              <ListGroup.Item>{this.props.restaurantNames[1]}</ListGroup.Item>
              <ListGroup.Item>{this.props.restaurantNames[2]}</ListGroup.Item>
            </ListGroup>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <br></br>
            <Alert variant={"danger"}>
              Your activity did not match those in our list. Please try again.
            </Alert>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default YelpItem;
