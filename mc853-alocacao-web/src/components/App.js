import React, {Component} from "react";
import LoginForm from "../pages/LoginForm";
import UserArea from "../pages/UserArea";
import AdminArea from "../pages/AdminArea";
import {Switch, Route, Redirect} from "react-router-dom";
import Header from './Header';

import "./../styles/App.css";
import "semantic-ui-css/semantic.min.css";
import CronogramaSemana from "./CronogramaSemana";
export const AppContext = React.createContext(); // Para o futuro

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {logado: false};
    }

    setLogado = (log, path) => {
        this.setState({ logado: log, redirect: true, redirectTo: path });
    };

    render() {
        const {logado, redirect} = this.state;
        console.log(this.state);

        if(redirect){
            this.setState({ redirect: false });
            return <Redirect to={this.state.redirectTo} />;
        }

        // Redirecionamento padrão caso nao esteja logado
        let telas = [
            <Route exact path='/login' component={() => (<LoginForm setLogado={this.setLogado} />)} />, // Se URL for exatamente /login, mostra o formulario de login
            <Route component={() => (<Redirect to='/login' />)} />  // Se qualquer outra coisa, redireciona pra /login
        ];

        // Redirecionamento padrão caso esteja logado
        if(logado)
            telas = [
                <Route path='/user' component={() => <UserArea />}/>, // Se URL começar com /user, mostra a area do usuario
                <Route path='/admin' component={() => <AdminArea />}/>,
                <Route component={() => <Redirect to='/user'/> }/> // Se for qualquer outra coisa, redireciona para /user
            ];

        return (
            <AppContext.Provider>
                <Header setLogado={this.setLogado}/>
                <Switch>
                    {telas}
                </Switch>
            </AppContext.Provider>
        );
    }
}
App.contextType = AppContext;

export default App;
