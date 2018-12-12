import React, { Component } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {  Button, Checkbox, Dropdown, Form, Input, Select, TextArea, Container } from "semantic-ui-react";
import "./../styles/BuscarSala.css";

class BuscarSala extends Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment(),
        endDate: moment()
      };
      // this.handleChange = this.handleChange.bind(this);
    }
  
    async fetchInstitutes(){
      let institutes = await axios.get('http://localhost:9001/institutos');
      institutes = institutes.data.institutes.map(i => i.name);
  
      this.setState({ institutes });  
    }
  
    async fetchSalas(instituto){
        let salas = await axios.get(`http://localhost:9001/instituto/${instituto}/salas`);
        salas = salas.data.salas.map(s => s.nome);
  
        this.setState({ salas });
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
  
  
    handleChangeStart = (date) => {
      this.setState({ startDate:date} );
    };
  
    handleChangeEnd = (date) => {
      this.setState( {endDate:date} );
    };
  
    submitForm = () => {
      console.log(this.state);
    };
  
    render() {
      const { value } = this.state;
      
      return (
        
        <div style={{ background: "#fdfdfd", width: "100%", height: "100%" }} onSubmit={this.submitForm}>
          <h1> Buscar Salas </h1>
          <Container class={"form"}>
            <Form style={{ padding: "30px" }}>
              
              <Form.Group widths="equal">
                <Form.Field required>
                  <label> Instituto </label>
                  <select onChange={(event) => this.selectInstitute(event.target.value)}>
                        {this.renderInstitutes(this.state.institutes)}                      
                  </select>
                </Form.Field>
                <Form.Field required>
                  <label> Sala </label>
                  <select onChange={(event) => this.selectSala(event.target.value)}>
                      {this.renderSalas(this.state.salas)}                      
                  </select>
                </Form.Field>
            </Form.Group>     
              
              <Form.Group>
                <Form.Field required>
                  <label> Horário de Início </label>
                  <DatePicker
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
                  <label> Horário Fim </label>
                  <DatePicker
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
            
              <Button type='submit'> 
                Buscar Sala
              </Button>
            </Form>
          </Container>
        </div>
      );
    }
  }
  
  export default BuscarSala;
  