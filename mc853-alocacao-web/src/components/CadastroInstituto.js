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

class CadastroInstituto extends Component {
  constructor(props){
    super(props);
    this.state = {
      endereco: '',
      cep: ''
    };
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value || input.checked });
  };

  submitForm = () => {
    console.log(this.state);
    axios
      .post(`http://localhost:9001/institutos`, this.state)
      .then(res => {
        if (res.status === 201) {
          swal({
            title: "Yayy!",
            text: "Instituto cadastrado com sucesso!",
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
                name="name"
                control={Input}
                label="Nome do Instituto"
                placeholder="Nome do Instituto"
                onChange={this.handleChange}
              />
              <Form.Field
                name="responsavel"
                control={Input}
                label="Responsável"
                placeholder="Responsável pelo instituto"
                onChange={this.handleChange}
              />
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
            </Form.Group>            
            <Button type='submit'> 
              Enviar 
            </Button>

          </Form>
        </Container>
      </div>
    );
  }
}

export default CadastroInstituto;
