import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Menu from "../components/Menu";

import "../styles/UserArea.css";
import CadastroSala from "../components/CadastroSala";
import CadastroUsuario from "../components/CadastroUsuario";
import PerfilInstituto from "../components/PerfilInstituto";
import Reserva from "../components/Reserva";
import PedidosReserva from "../components/PedidosReserva";
import MapContainer from "../components/MapContainer";
import PerfilSala from "../components/PerfilSala";
import NotFound404 from "../components/NotFound404";
import MinhasReservas from "../components/MinhasReservas";
import CronogramaSemana from "../components/CronogramaSemana";
import BuscarSala from "../components/BuscarSala";
import CadastroInstituto from "../components/CadastroInstituto";


// Páginas disponiveis para o usuário
const adminPages = [
    {nome: 'Minhas reservas', url: '/admin', jsx: MinhasReservas},
    {nome: 'Cadastrar Salas', url: '/admin/cadastro-sala', jsx: CadastroSala},
    {nome: 'Cadastrar Usuário', url: '/admin/cadastro-usuario', jsx: CadastroUsuario},
    {nome: 'Cadastrar Instituto', url: '/admin/cadastro-instituto', jsx: CadastroInstituto},
    {nome: 'Pedidos reservas', url: '/admin/pedidos-reservas', jsx: PedidosReserva},
    {nome: 'Perfil de Instituto', url: '/admin/perfil-instituto', jsx: PerfilInstituto},
    {nome: 'Reservar Salas', url:'/admin/reservar-sala', jsx: Reserva},
    {nome: 'Cronograma de Salas', url:'/admin/cronograma-sala', jsx: CronogramaSemana},
    {nome: 'Buscar Salas', url:'/admin/buscar-salas', jsx: NotFound404},
    {nome: 'Mapa', url:'/admin/mapa', jsx: MapContainer},
    {nome: 'Perfil da Sala', url:'/admin/perfil-sala', jsx:PerfilSala}
];

class AdminArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderPages = () =>{
        let routes = [];
        for(let i in adminPages)
            routes.push(<Route exact path={adminPages[i].url} component={adminPages[i].jsx} />); // Mostra determinado componente dependendo da URL
        return routes;
    };

    render() {
        return (
            <div id="user-area">
                <Menu list={adminPages}/>
                <div class="user-tela">
                    <Switch>
                        {this.renderPages()}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default AdminArea;