import React, { Component } from "react";
import axios from "axios";
import swal from '@sweetalert/with-react';
import {} from '../utils/Utils';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Message,
  Radio,
  Select,
  TextArea,
  Container,
  Dropdown
} from "semantic-ui-react";
import "./../styles/PedidosReserva.css";
import { throws } from "assert";

class PedidosReserva extends Component {
  constructor(props){
    super(props);
    this.state = {
        pedidos: []
    };
    this.fetchPedidosReservas();
  }

  async fetchPedidosReservas(){
    let pedidos = await axios.get('http://localhost:9001/pedido-reservas');
    pedidos = pedidos.data.pedidos;
    console.log(pedidos);
    this.setState({ pedidos });
  }

  renderPedidos(pedidos){
      let lista = [];
      
      if(pedidos.length == 0)
        return [<li>Não há pedidos de reservas para serem avaliados</li>];
      
      for(let p of pedidos){
        let inicio = new Date(p.horarioInicio);
        let fim = new Date(p.horarioFim);
        lista.push(
            <li>
                <strong class='pedido-nome'> { p.sala } </strong>
                <span class='pedido-data'> { inicio.toDateTimeString() } </span>
                <span class='pedido-data'> { fim.toDateTimeString() } </span>
                <button class='pedido-botao' data-id={p._id} onClick={event => this.confirmaPedido(event.target.dataset.id)}> Aceitar </button>
                <button class='pedido-botao' data-id={p._id} onClick={event => this.recusaPedido(event.target.dataset.id)}> Recusar </button>
                <p class='pedido-responsavel'> { p.responsavel } ({ p.matriculaResponsavel }) { p.externo ? (<strong> - Público externo</strong>):('') }</p>
                <p class='pedido-descricao'> { p.comentarios } </p>
            </li>
        );
      }

    return lista;
  }

  async confirmaPedido(id){
      await axios.get('http://localhost:9001/confirma-reserva/' + id);
      this.fetchPedidosReservas();
  }

  async recusaPedido(id){
      await axios.delete('http://localhost:9001/confirma-reserva/' + id);
      this.fetchPedidosReservas();
  }

  render() {    
    return (
      <div id='pedidos-reserva'>
        <h1> Pedidos de Reservas </h1>

        <ul class='lista-pedidos'>
            {this.renderPedidos(this.state.pedidos)}
        </ul>
      </div>
    );
  }
}

export default PedidosReserva;
