import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Menu from "../components/Menu";

import "../styles/UserArea.css";
import CadastroSala from "../components/CadastroSala";
import CadastroUsuario from "../components/CadastroUsuario";
import PerfilInstituto from "../components/PerfilInstituto";
import Reserva from "../components/Reserva";
import MapContainer from "../components/MapContainer";
import PerfilSala from "../components/PerfilSala";
import NotFound404 from "../components/NotFound404";
import MinhasReservas from "../components/MinhasReservas";
import CronogramaSemana from "../components/CronogramaSemana";
import BuscarSala from "../components/BuscarSala";

// Páginas disponiveis para o usuário
const userPages = [
    {nome: 'Minhas reservas', url: '/user', jsx: MinhasReservas},
    {nome: 'Perfil de Instituto', url: '/user/perfil-instituto', jsx: PerfilInstituto},
    {nome: 'Reservar Salas', url:'/user/reservar-sala', jsx: Reserva},
    {nome: 'Cronograma de Salas', url:'/user/cronograma-sala', jsx: CronogramaSemana},
    {nome: 'Buscar Salas', url:'/user/buscar-salas', jsx: NotFound404},
    {nome: 'Mapa', url:'/user/mapa', jsx: MapContainer},
    {nome: 'Perfil da Sala', url:'/user/perfil-sala', jsx:PerfilSala}
];

class UserArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderPages = () =>{
        let routes = [];
        for(let i in userPages)
            routes.push(<Route exact path={userPages[i].url} component={userPages[i].jsx} />); // Mostra determinado componente dependendo da URL
        return routes;
    };

    render() {
        return (
            <div id="user-area">
                <Menu list={userPages}/>
                <div class="user-tela">
                    <Switch>
                        {this.renderPages()}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default UserArea;