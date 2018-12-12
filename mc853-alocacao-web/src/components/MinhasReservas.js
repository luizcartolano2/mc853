import React, { Component } from "react";
import axios from "axios";
import {} from '../utils/Utils';
import "./../styles/PedidosReserva.css";
import { applyMiddleware } from "redux";

class MinhasReservas extends Component {
  constructor(props){
    super(props);
    this.state = {
        pedidos: [],
        reservas: []
    };
    this.fetchPedidosReservas();
    this.fetchReservas();
  }

  async fetchPedidosReservas(){
    let pedidos = await axios.get('http://localhost:9001/pedido-reservas');
    pedidos = pedidos.data.pedidos;
    // console.log(pedidos);
    this.setState({ pedidos });
  }

  async fetchReservas() {
    let reservas = await axios.get('http://localhost:9001/reservas');
    reservas = reservas.data.reservas;
    this.setState({ reservas });
  }

  renderPedidos(pedidos){
      let lista = [];
      console.log("oi");

      if(pedidos.length == 0)
        return [<li>Não há pedidos de reservas para serem avaliados</li>];
      
      for(let p of pedidos){

        if (p.matriculaResponsavel === window.user.matricula) {
          let inicio = new Date(p.horarioInicio);
          let fim = new Date(p.horarioFim);
          lista.push(
              <li>
                  <strong class='pedido-nome'> { p.sala } </strong>
                  <span class='pedido-data'> { inicio.toDateTimeString() } </span>
                  <span class='pedido-data'> { fim.toDateTimeString() } </span>
                  <p class='pedido-responsavel'> { p.responsavel } ({ p.matriculaResponsavel }) { p.externo ? (<strong> - Público externo</strong>):('') }</p>
                  <p class='pedido-descricao'> { p.comentarios } </p>
              </li>
          );  
        }
      }

      if(lista.length == 0)
        return [<li>Não há pedidos de reservas para serem avaliados</li>];

    return lista;
  }

  renderReservas(reservas){
    let listaReservas = [];
    console.log("oi");

    if(reservas.length == 0)
      return [<li>Não há pedidos de reservas para serem avaliados</li>];
    
    for(let r of reservas){

      if (r.matriculaResponsavel === window.user.matricula) {
        let inicioR = new Date(r.horarioInicio);
        let fimR = new Date(r.horarioFim);
        listaReservas.push(
            <li>
                <strong class='pedido-nome'> { r.sala } </strong>
                <span class='pedido-data'> { inicioR.toDateTimeString() } </span>
                <span class='pedido-data'> { fimR.toDateTimeString() } </span>
                <p class='pedido-responsavel'> { r.responsavel } ({ r.matriculaResponsavel }) { r.externo ? (<strong> - Público externo</strong>):('') }</p>
                <p class='pedido-descricao'> { r.comentarios } </p>
            </li>
        );  
      }
    }

    if(listaReservas.length == 0)
      return [<li>Não há pedidos de reservas para serem avaliados</li>];

  return listaReservas;
}


  render() {    
    return (
      <div id='pedidos-reserva'>
        <h1> Pedidos de Reservas </h1>

        <ul class='lista-pedidos'>
            {this.renderPedidos(this.state.pedidos)}
        </ul>
        <h1> Reservas </h1>
        <ul class='lista-pedidos'>
          {this.renderReservas(this.state.reservas)}
        </ul>
      </div>
    );
  }
}

export default MinhasReservas;
