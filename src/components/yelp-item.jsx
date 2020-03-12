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
        "raw_food,opensandwiches,rotisserie_chicken,salad,sandwiches,seafood,sushi,vegan,vegetarian";
    } else if (category === 1) {
      categories =
        "african,arabian,breakfast_brunch,burgers,chicken_wings,chinese,comfortfood,hotdogs,greek,halal,indian,italian,kebab,mexican,mideastern,pizza,soulfood,thai";
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
          latitude: this.props.coordinates[0],
          longitude: this.props.coordinates[1],
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
          [
            res.data.businesses[i].coordinates.latitude,
            res.data.businesses[i].coordinates.longitude
          ],
          [
            res.data.businesses[j].coordinates.latitude,
            res.data.businesses[j].coordinates.longitude
          ],
          [
            res.data.businesses[k].coordinates.latitude,
            res.data.businesses[k].coordinates.longitude
          ]
        ];
        var ratings = [
          res.data.businesses[i].rating,
          res.data.businesses[j].rating,
          res.data.businesses[k].rating
        ];
        var prices = [
          res.data.businesses[i].price,
          res.data.businesses[j].price,
          res.data.businesses[k].price
        ];
        var displayPhones = [
          res.data.businesses[i].display_phone,
          res.data.businesses[j].display_phone,
          res.data.businesses[k].display_phone
        ];
        this.props.addRestaurantDetails(prices, ratings, displayPhones);
        this.props.addRestaurantNames(names);
        this.props.addRestaurantLocations(locations);
        this.props.toggleLoading();
        console.log(res);
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
    if (this.props.buttonClicked && this.props.categories.length !== 0) {
      this.fetchResponse(this.props.categories[0]);
      this.props.toggleButton();
    } else if (this.props.buttonClicked) {
      this.props.reset();
    }
  };
  render() {
    var categories = this.props.categories;
    return (
      <div>
        {categories.length !== 0 ? (
          <React.Fragment>
            <br></br>
            <ListGroup variant="primary">
              <div style={{ textAlign: "center" }}>
                <ListGroup.Item>{this.props.restaurantNames[0]}</ListGroup.Item>
                <ListGroup.Item>{this.props.restaurantNames[1]}</ListGroup.Item>
                <ListGroup.Item>{this.props.restaurantNames[2]}</ListGroup.Item>
              </div>
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
