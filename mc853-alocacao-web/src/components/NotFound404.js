import React, { Component } from 'react';
import logo from './../assets/logo.svg';
import './../styles/NotFound404.css';

class NotFound404 extends Component {
 render() {
   return (
      <div id="notfound-wrapper">
          <div id="notfound-content">
                <img src={logo}/>
                <p className="title">Página não encontrada</p>
                <p className="body">Esta página ainda está em construção</p>
          </div>
      </div>
   );
 }
}

export default NotFound404;
