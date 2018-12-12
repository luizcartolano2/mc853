import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map 
                google={this.props.google} 
                initialCenter={{
                    lat: -22.813796,
                    lng: -47.063936
                  }}
                zoom={14}
                >
                <Marker
                    title={'Instituto de Computação'}
                    name={'IC'}
                    position={{lat: -22.813796, lng: -47.063936}} 
                />
                <Marker
                    title={'Faculdade de Engenharia Elétrica e de Computação'}
                    name={'FEEC'}
                    position={{lat: -22.820882, lng: -47.066470}} 
                />
                {/* , -47.067192 */}
                <Marker
                    title={'Faculdade de Engenharia de Alimentos'}
                    name={'FEA'}
                    position={{lat: -22.820056, lng: -47.067192}} 
                />
            </Map>
	    );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDmdKVwSqkyvOdG8qF6fQ73dCLu6xlXKy8')
})(MapContainer)
