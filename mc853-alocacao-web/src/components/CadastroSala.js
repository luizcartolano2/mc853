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
import "./../styles/CadastroSala.css";
import { throws } from "assert";

const diasDisponiveis = [
  { key: "segunda", text: "Segunda-feira", value: "segunda" },
  { key: "terca", text: "Terça-feira", value: "terca" },
  { key: "quarta", text: "Quarta-feira", value: "quarta" },
  { key: "quinta", text: "Quinta-feira", value: "quinta" },
  { key: "sexta", text: "Sexta-feira", value: "sexta" },
  { key: "sabado", text: "Sábado", value: "sabado" },
  { key: "domingo", text: "Domingo", value: "domingo" }
];

const carachteristics = [
  { key: "arCond", text: "Ar-condicionado", value: "arCondicionado" },
  { key: "proj", text: "Projetor", value: "projetor" },
  {
    key: "acessibilidade",
    text: "Acessível para deficientes",
    value: "acessibilidade"
  }
];

class CadastroSala extends Component {
  constructor(props){
    super(props);
    this.state = {
      endereco: '',
      cep: ''
    };
    this.fetchInstitutes();

  }

  async fetchInstitutes(){
    let institutes = await axios.get('http://localhost:9001/institutos');
    institutes = institutes.data.institutes.map(i => i.name);

    await this.setState({ institutes });
  }

  renderInstitutes(institutes){
    if(!institutes)
        return;

    return institutes.map(str => <option>{ str }</option>);
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value || input.checked });
  };

  submitForm = () => {
    console.log(this.state);
    axios
      .post(`http://localhost:9001/salas`, this.state)
      .then(res => {
        if (res.status === 201) {
          swal({
            title: "Yayy!",
            text: "Sala cadastrada com sucesso!",
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
        console.log({err});
        console.log(JSON.stringify(err));

      });
  };

  async fetchCEP(cep) {
    if(!cep)
      cep = '';
    
    cep = cep.replace(/\D/g, '').substring(0, 8);
    
    if(cep.length == 8) {
      let response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if(response.data.logradouro)
        this.setState({ endereco: response.data.logradouro });
    }

    if(cep.length > 5)
      cep = cep.insertAt('-', 5);

    this.setState({ cep });      
  }

  render() {
    const { value } = this.state;
    
    return (
      <div style={{ background: "#fdfdfd", width: "100%", height: "100%" }}>
        <h1> Cadastro de Salas </h1>
        <Container class={"form"}>
        <Form style={{ padding: "30px" }} onSubmit={this.submitForm}>
            <Form.Group widths="equal">
              <Form.Field
                required
                name="nome"
                control={Input}
                label="Nome da Sala"
                placeholder="Nome da Sala"
                onChange={this.handleChange}
              />
              <Form.Field required>
                <label>Instituto</label>
                <select onChange={event => this.setState({ instituto: event.target.value })}>
                  <option value="">Selecione um instituto</option>
                  {this.renderInstitutes(this.state.institutes)}
                </select>
              </Form.Field>

              <Form.Field
                required
                name="capacidade"
                control={Input}
                label="Quantidade de lugares"
                placeholder="Quantidade de lugares"
                onChange={this.handleChange}
                type="number"
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field required>
                <label> Caracteristicas da sala</label>
                <Dropdown
                  name="caracteristicas"
                  label="Caracteristicas da sala"
                  placeholder="Caracteristicas da sala"
                  fluid
                  multiple
                  selection
                  options={carachteristics}
                  onChange={this.handleChange}
                />
              </Form.Field>
              
              <Form.Field required>
                <label> Dias disponíveis </label>
              
                <Dropdown
                  name="dias"
                  label="Dias disponíveis"
                  placeholder="Dias disponíveis"
                  fluid
                  multiple
                  selection
                  options={diasDisponiveis}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                required
                name="cep"
                control={Input}
                label="CEP"
                placeholder="CEP"
                value={this.state.cep}
                onChange={(event) => this.fetchCEP(event.target.value)}
              />
              <Form.Field
                required
                name="endereco"
                control={Input}
                label="Endereço"
                placeholder="Endereço"
                value={this.state.endereco}
                onChange={this.handleChange}
              />
              <Form.Field
                name="complemento"
                control={Input}
                label="Complemento"
                placeholder="Complemento (Opcional)"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Field
              name="comentarios"
              control={TextArea}
              label="Comentários"
              placeholder="Informações pertinentes podem ser comentadas aqui ..."
              onChange={this.handleChange}
            />
            
            <Button type='submit'> 
              Enviar 
            </Button>

          </Form>
        </Container>
      </div>
    );
  }
}

export default CadastroSala;
