import React, { Component } from 'react';
import './../styles/PerfilSala.css';
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './MyGreatPlace'

import {
  Dropdown
} from "semantic-ui-react";

class PerfilSala extends Component{
  handleChange = (e, input) => {};

  constructor(props) {
    super(props);
    this.state = {
      sala: {
        name: 'IC-351',
        sigla: '351',
        instituto: 'IC',
        temProjetor: 'Sim',
        temQuadroBranco: 'Não',
        tipo: 'Auditório',
        capacidade: 100,
        horario: 'Todos os Dias das 8h às 23h',
        acessibilidade: 'Acessível',
        image: 'http://www.unicamp.br/unicamp/sites/default/files/styles/large/public/dsc_4989_15-10-2013_350x230.jpg?itok=HY64rnIh',
        center: {
            lat: -22.81359007,
            lng: -47.06412346
          },
        zoom: 17
      },
    };
  }
  render() {
    return(
      <div align="center" className="PerfilSala" style={{ background: "#fdfdfd", width: "100%", height: "100%", padding: "10px" }}>
        <h1> Perfil da Sala </h1>
        <div align="center">
          <Image src={this.state.sala.image} />
          <Profile sala={this.state.sala} />
          <p></p>
          <div style={{ height: '40vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDmdKVwSqkyvOdG8qF6fQ73dCLu6xlXKy8' }}
              defaultCenter={this.state.sala.center}
              defaultZoom={this.state.sala.zoom}>
              <MyGreatPlace lat={this.state.sala.center.lat} lng={this.state.sala.center.lng} text={this.state.sala.sigla} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}

function Image(props){
    return (
      <img src={props.src} style={{ height: '10vh' }} />
    ); 
}
function Profile(props){
  return (
      <div className="Sala">
        <h1 className="Name">{props.sala.name} ({props.sala.tipo})</h1>
        <p className="Instituto">Instituto: {props.sala.instituto}</p>
        <p className="Capacidade">Capacidade: {props.sala.capacidade}</p>
        <p className="Horario">Horário de Funcionamento: {props.sala.horario}</p>
        <p className="Acessibilidade"> Acessibilidade: {props.sala.acessibilidade}</p>
        <p className="Projetor"> Tem Projetor: {props.sala.temProjetor}</p>
        <p className="QuadroBranco"> Tem Quadro Branco: {props.sala.temQuadroBranco}</p>
      </div>
    );
}

export default PerfilSala;