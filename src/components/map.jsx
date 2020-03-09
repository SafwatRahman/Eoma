import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class GoogleMap extends Component {
  render() {
    const style = {
      width: "93.0%",
      height: "100%"
    };
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.apiKey
}))(GoogleMap);
