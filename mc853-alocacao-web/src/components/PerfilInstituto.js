import React, { Component } from 'react';
import './../styles/PerfilInstituto.css';
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './MyGreatPlace'

import {
  Dropdown
} from "semantic-ui-react";

class PerfilInstituto extends Component{
  handleChange = (e, input) => {};

  constructor(props) {
    super(props);
    this.state = {
      instituto: {
        name: 'Instituto de Computação',
        sigla: 'IC',
        campus: 'Campus de Campinas',
        area: 'Exatas',
        nsalas: '10',
        horario: 'Todos os Dias das 8h às 23h',
        responsaveis: 'Prof. Dr. Rodolfo Jardim de Azevedo',
        contato: 'sec-grad@ic.unicamp.br',
        acessibilidade: 'Parcial',
        salas: [
          { key: "1", text: "IC1", value: "ic1" },
          { key: "2", text: "IC2", value: "ic2" }
        ],
        image: 'https://www.lasca.ic.unicamp.br/static/img/ic.png',
        center: {
          lat: -22.8137765,
          lng: -47.0640004
        },
        zoom: 17
      },
    };
  }
  render() {
    return(
      <div align="center" className="PerfilInstituto" style={{ background: "#fdfdfd", width: "100%", height: "100%", padding: "10px" }}>
        <h1> Pefil de Instituto </h1>
        <div align="center">
          <Image src={this.state.instituto.image} />
          <Profile instituto={this.state.instituto} />
          <p></p>
          <Dropdown style={{ width: '25%' }}
                name="salas"
                label="Salas do Instituto"
                placeholder="Salas do Instituto"
                fluid
                selection
                options={this.state.instituto.salas}
                onChange={this.handleChange}
              />
          <p></p>
          <div style={{ height: '40vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDmdKVwSqkyvOdG8qF6fQ73dCLu6xlXKy8' }}
              defaultCenter={this.state.instituto.center}
              defaultZoom={this.state.instituto.zoom}>
              <MyGreatPlace lat={this.state.instituto.center.lat} lng={this.state.instituto.center.lng} text={this.state.instituto.sigla} />
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
      <div className="Instituto">
        <h1 className="Name">{props.instituto.name} ({props.instituto.sigla})</h1>
        <p className="Campus">{props.instituto.campus}</p>
        <p className="Area">Área: {props.instituto.area}</p>
        <p className="NSalas">Número de Salas: {props.instituto.nsalas}</p>
        <p className="Horario">Horário de Funcionamento: {props.instituto.horario}</p>
        <p className="Responsaveis">Responsável(is): {props.instituto.responsaveis}</p>
        <p className="Contato"> Contato: {props.instituto.contato}</p>
        <p className="Acessibilidade"> Acessibilidade: {props.instituto.acessibilidade}</p>
      </div>
    );
}

export default PerfilInstituto;