import React, { Component } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {  Button, Form, TextArea, Container } from "semantic-ui-react";
import "./../styles/Reserva.css";
import swal from '@sweetalert/with-react';

class Reserva extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.fetchInstitutes();
  }

  async fetchInstitutes(){
    let institutes = await axios.get('http://localhost:9001/institutos');
    institutes = institutes.data.institutes.map(i => i.name);

     await this.setState({ institutes });  
  }

  async fetchSalas(instituto){
      let salas = await axios.get(`http://localhost:9001/instituto/${instituto}/salas`);
      salas = salas.data.salas.map(s => s.nome);

      await this.setState({ salas });
  }

  renderInstitutes(institutes){
    if(!institutes)
        return;

    return institutes.map(str => <option>{ str }</option>);
  }

  renderSalas(salas){
      if(!salas)
          return;

      return salas.map(str => <option>{ str }</option>);
  }

  async selectInstitute(instituto){
    this.setState({ instituto });
    await this.fetchSalas(instituto);
  }

  handleChangeStart = (date) => {
    this.setState({ startDate:date, horarioInicio: date.format()} );
  }

  handleChangeEnd = (date) => {
    this.setState( {endDate:date, horarioFim: date.format()} );
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value || input.checked });
  };

  submitForm = () => {
    console.log(this.state);
    axios
      .post(`http://localhost:9001/pedido-reservas`, { ...this.state, matriculaResponsavel: window.user.matricula, responsavel: window.user.nome })
      .then(res => {
        if (res.status === 201) {
          swal({
            title: "Yayy!",
            text: "Pedido de reserva cadastrado com sucesso!",
            icon: "success",
            closeOnClickOutside: true,
          });
          console.log(res);
        }
      })
      .catch( err => {
        swal({
          title: "Ops!",
          text: err.response.data.message,
          icon: "error",
          closeOnClickOutside: true,
        });
        console.log(err);
      });
  }

  render() {
    return (
      
      <div id="reserva" style={{ background: "#fdfdfd", width: "100%", height: "100%" }} onSubmit={this.submitForm}>
        <h1> Reservar uma sala </h1>
        <Container class={"form"}>
          <Form style={{ padding: "30px" }}>
            
            <Form.Group widths="equal">
              <Form.Field required>
                <label> Instituto </label>
                <select required onChange={(event) => this.selectInstitute(event.target.value)}>
                  <option value="">Selecione um instituto</option>
                  {this.renderInstitutes(this.state.institutes)}                      
                </select>
              </Form.Field>
              <Form.Field required>
                <label> Sala </label>
                <select required onChange={(event) => this.setState({ sala: event.target.value})}>
                  <option value="">Selecione uma sala</option>
                  {this.renderSalas(this.state.salas)}                      
                </select>
              </Form.Field>
          </Form.Group>     
            
            <Form.Group>
              <Form.Field required>
                <label> Início do Evento </label>
                <DatePicker
                    required
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    showTimeSelect
                    dateFormat="DD-MM-YYYY HH:mm"
                    timeIntervals={30}
                />
              </Form.Field>

              <Form.Field required>
                <label> Fim do Evento </label>
                <DatePicker
                    required
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    showTimeSelect
                    dateFormat="DD-MM-YYYY HH:mm"
                    timeIntervals={30}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field required>
              <label> Voltado ao público externo </label>
              <select required onChange={(event) => this.setState({ externo: event.target.value })}>
                <option value="">Selecione uma opção</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </Form.Field>

            <Form.Field
              required
              name="comentarios"
              control={TextArea}
              label="Descrição da atividade a ser realizada"
              placeholder="Descreva o motivo da solicitação de reserva da sala."
              onChange={this.handleChange}
            />
          
            <Button type='submit'> 
              Solicitar Reservar
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Reserva;
