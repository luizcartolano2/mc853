import React, { Component } from 'react';
import logo from './../assets/logo.svg';

import { Link } from 'react-router-dom';
import './../styles/App.css';

class Sobre extends Component {
 render() {
   return (
      <div className="App">
         <h1> Sobre </h1>
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Página de Sobre</h1>
         </header>
         <p className="App-intro">

            <Link to="/">Ir para a página sobre \o/</Link>
              Exemplo de Página Sobre :)
         </p>
      </div>
   );
 }
}

export default Sobre;
