import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

export class GoogleMap extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  };

  displayMarkers = () => {
    return this.props.restaurantCoordinates.map((restaurant, index) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={index}
          name={this.props.restaurantNames[index]}
          price={"Price: " + this.props.prices[index]}
          rating={"Rating: " + this.props.ratings[index] + "/5"}
          phoneNumber={"Phone number: " + this.props.phoneNumbers[index]}
          id={index}
          position={{
            lat: restaurant[0],
            lng: restaurant[1]
          }}
        />
      );
    });
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const style = {
      width: "92%",
      height: "100%"
    };
    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={14}
          style={style}
          initialCenter={{
            lat: this.props.userCoordinates[0],
            lng: this.props.userCoordinates[1]
          }}
        >
          <Marker
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
            onClick={this.onMarkerClick}
            name={"Current Location"}
            position={{
              lat: this.props.userCoordinates[0],
              lng: this.props.userCoordinates[1]
            }}
          />
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h6>{this.state.selectedPlace.name}</h6>
              <p>{this.state.selectedPlace.price}</p>
              <p>{this.state.selectedPlace.rating}</p>
              <p>{this.state.selectedPlace.phoneNumber}</p>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey
}))(GoogleMap);
