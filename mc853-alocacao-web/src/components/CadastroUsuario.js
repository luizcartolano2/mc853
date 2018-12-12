import React, { Component } from "react";
import axios from "axios";
import swal from '@sweetalert/with-react';

import {
  Form,
  Input,
  Message,
  Select,
  Container
} from "semantic-ui-react";
import "./../styles/CadastroUsuario.css";

const options = [
  { key: "adminType", text: "Administrador", value: "admin" },
  { key: "studentType", text: "Aluno", value: "user" },
  {key: "profType", text: "Professor", value: "prof"}
];

class CadastroUsuario extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value || input.checked });
  };

  submitForm = () => {
    axios.post(`http://localhost:9001/usuarios`, this.state)
      .then(res => {
        if(res.status === 201) {
          swal({
            title: "Yayy!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success",
            closeOnClickOutside: true,
          });
          console.log(res);
        }
      })
      .catch(err => {
        swal({
          title: "Ops!",
          text: err.response.data.message,
          icon: "error",
          closeOnClickOutside: true,
        });
        console.log(err);
      });
  };

  render() {
    const { value } = this.state;

    let matchPasswd = !this.state['senha-conf'] || this.state['senha-conf'] == this.state['senha'];

    return (
      <div style={{ background: "#fdfdfd", width: "100%", height: "100%" }}>
        <h1> Cadastro de usuários </h1>
        <Container class={"form"}>
          <Form style={{ padding: "30px" }} onSubmit={this.submitForm} error={!matchPasswd}>
            <Form.Group widths="equal">
              <Form.Field
                required
                control={Input}
                name="nome"
                ref="nome"
                label="Nome completo"
                maxLength="50"
                placeholder="Nome completo"
                onChange={this.handleChange}
              />
              <Form.Field
                required
                control={Input}
                label="RA"
                ref="RA"
                name="matricula"
                placeholder="Ex: 123456"
                onChange={this.handleChange}
              />
              <Form.Field
                control={Select}
                label="Tipo"
                name="type"
                ref="Tipo"
                options={options}
                placeholder="Administrador"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Instituto"
                name="instituto"
                ref="Instituto"
                placeholder="Instituto"
                onChange={this.handleChange}
              />
              <Form.Field
                control={Input}
                label="Curso"
                name="curso"
                ref="Curso"
                placeholder="Curso"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                label="Email"
                name="email"
                ref="Email"
                type="email"
                placeholder="joe@schmoe.com"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                  required
                  label="Senha"
                  name="senha"
                  ref="Senha"
                  placeholder="senha topster 123"
                  type="password"
                  maxLength="20"
                  error={!matchPasswd}
                  onChange={this.handleChange}
              />
              <Form.Input
                  required
                  label="Confirmação da senha"
                  name="senha-conf"
                  placeholder="senha topster 123"
                  ref="Confirmação da senha"
                  type="password"
                  maxLength="20"
                  error={!matchPasswd}
                  onChange={this.handleChange}
              />
            </Form.Group>

            <Message
              error
              header='Senhas não conferem'
              content='A senha e confirmação de senha devem ser iguais'
            />

            <Form.Button content="Enviar" disabled={!matchPasswd} />
          </Form>
        </Container>
      </div>
    );
  }
}

export default CadastroUsuario;
