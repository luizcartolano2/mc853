import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment
} from "semantic-ui-react";
import "../assets/banana.svg";
import "../styles/LoginForm.css";
import swal from '@sweetalert/with-react';
import axios from "axios";


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formSubmit = this.formSubmit.bind(this);
    }

    handleChange = (e, input) => {
        this.setState({[input.name]: input.value || input.checked});
    };

    async formSubmit(){
        console.log(this.state);
        console.log('SUBMITOU O FORM DE LOGIN!');
        
        let serverResponse = await axios.post('http://localhost:9001/auth',{
            email: this.state.user,
            senha: this.state.password,
            // type: this.state.type
        });

        console.log('serverResponse:', serverResponse);

        if (serverResponse.status === 200) {
            console.log(serverResponse.data.user.type);
            if (serverResponse.data.user.type == "admin") {
                this.props.setLogado(true, `/admin`); 
            } else {
                this.props.setLogado(true, '/user');
            }
            window['user'] = serverResponse.data.user;
        }
        else {
            console.log('NAO DEVIA LOGAR!');
            swal({
                title: "You shall not pass!",
                text: "Ops! Tente novamente!",
                icon: "error",
                closeOnClickOutside: true,
              });
        }
    };

    render() {
        return (
            <div className="login-form" style={{height: "100%"}}>
                <Grid textAlign="center" style={{height: "100%"}} verticalAlign="middle">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h2" color="teal" textAlign="center">
                            Entre na sua conta
                        </Header>
                        <Form size="large" onSubmit={this.formSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    name="user"
                                    iconPosition="left"
                                    placeholder="E-mail"
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    name="password"
                                    iconPosition="left"
                                    placeholder="Senha"
                                    type="password"
                                    onChange={this.handleChange}
                                />

                                <Button
                                    color="teal"
                                    fluid
                                    size="large"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default LoginForm;
