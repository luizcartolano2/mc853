import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from "axios";

import "./../styles/CronogramaSemana.css";

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const colors = [
    'vermelho',
    'alaranjado',
    'amarelo',
    'verde',
    'azul',
    'anil',
    'violeta'
];

class CronogramaSemana extends Component {
    constructor(props){
        super(props);
        
        let week = new Date();
        week.setDate(week.getDate() - week.getDay());
        this.state = { week };
        this.fetchEvents();
        this.fetchInstitutes();
    }

    async fetchEvents(){
        const { week, sala } = this.state;

        if(!sala)
            return;

        let nextWeek = new Date();
        nextWeek.setFullYear(week.getFullYear());
        nextWeek.setMonth(week.getMonth());
        nextWeek.setDate(week.getDate() + 6);
        nextWeek.setHours(23, 59, 59, 999);

        let reservas = await axios.get(`http://localhost:9001/reservas/${sala}` +
        `?horarioInicio=${ week.getFullYear() }-${('0'+(week.getMonth() + 1)).slice(-2)}-${('0'+week.getDate()).slice(-2)} 00:00:00` +
        `&horarioFim=${ nextWeek.getFullYear() }-${('0'+(nextWeek.getMonth() + 1)).slice(-2)}-${('0'+nextWeek.getDate()).slice(-2)} 23:59:59`);

        console.log(reservas);

        reservas = JSON.parse(JSON.stringify(reservas.data.reservas));

        console.log(reservas);

        for(let i = 0; i < reservas.length; i++){
            let reserva = reservas[i];

            let inicio = new Date(reserva.horarioInicio);
            let fim = new Date(reserva.horarioFim);

            if(inicio.getFullYear() != fim.getFullYear()
                || inicio.getMonth() != fim.getMonth()
                || inicio.getDate() != fim.getDate()){

                let newReserva = JSON.parse(JSON.stringify(reserva));

                fim.setFullYear(inicio.getFullYear());
                fim.setMonth(inicio.getMonth());
                fim.setDate(inicio.getDate());
                fim.setHours(23, 59, 59, 999);

                let newInicio = new Date(inicio);
                newInicio.setDate(inicio.getDate() + 1);
                newInicio.setHours(0, 0, 0, 0);

                newReserva.horarioInicio = newInicio.toISOString();;

                if(fim < week)
                    reservas[i--] = newReserva;
                else if(newInicio < nextWeek)
                    reservas.push(newReserva);
            }


            reserva.duracao = (fim - inicio)/(1000*60*60);
            reserva.diaSemana = inicio.getDay();
            reserva.inicio = inicio.getHours();
            reserva.horario = `${ ('0'+ inicio.getHours()).slice(-2) }:${ ('0' + inicio.getMinutes()).slice(-2) }`;
        }

        await this.setState({ reservas });
    }

    renderHours = (eventList) => {
        if(!eventList)
            return;

        let hours = [];

        for (let i = 0; i < 24; i++) {
            let hour = `<tr><td class='horario'> ${("0" + i).slice(-2)}:00</td>`;

            for(let j = 0; j < 7; j++) {

                let evento = null;

                for(let evt of eventList)
                    if(evt.diaSemana == j && evt.inicio == i) {
                        evento = evt;
                        break;
                    }
                
                if(evento != null) 
                    hour +=
                    `<td style='position: relative'>
                        <div class='evento ${ colors[evento.diaSemana] }' style='height: calc(${ evento.duracao * 100 }% + ${ Math.floor(evento.duracao) }px); top: ${(new Date(evento.horarioInicio)).getMinutes()/.6}%;'>
                            <p> ${ evento.horario } </p>
                            <p> Reservado </p>
                        </div>
                    </td>`;
                else 
                    hour += `<td></td>`;
            }

            hour += "</tr>"
            hours.push(ReactHtmlParser(hour))
        }

        hours.push(<tr><td class='horario'>00:00</td></tr>);

        return hours;
    };

    async nextWeek() {
        let { week } = this.state;
        week.setDate(week.getDate() + 7);
        await this.setState({ week });
        await this.fetchEvents();
    }

    async prevWeek() {
        let { week } = this.state;
        week.setDate(week.getDate() - 7);
        await this.setState({ week });
        await this.fetchEvents();
    }

    renderHeader(meses){
        let header = [<th></th>];
        let keys = [];

        for(let key in meses)
            keys.push(Number(key));

        if(keys.length > 1){
            let a = keys[0];
            let b = keys[1];

            if(a > b) {
                keys[0] = b;
                keys[1] = a;
            }

            if(keys[0] + 1 != keys[1]){
                let c = keys[0];
                keys[0] = keys[1];
                keys[1] = c;
            }
        }
        
        for(let k of keys)
            header.push(<th colSpan={meses[k]} style={{textAlign: 'left'}}>{months[k]}</th>);

        return header;
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

    async resetState(){
        let week = new Date();
        week.setDate(week.getDate() - week.getDay());

        this.setState({
            salas: null,
            sala: null,
            reservas: null,
            week
        });
    }

    async selectInstitute(instituto){
        await this.resetState();
        await this.fetchSalas(instituto);
    }

    async selectSala(sala){
        let week = new Date();
        week.setDate(week.getDate() - week.getDay());
        await this.setState({ sala, week });
        await this.fetchEvents();
    }

    render() {
        let sunday = new Date();
        let { week } = this.state;
        sunday.setFullYear(week.getFullYear());
        sunday.setMonth(week.getMonth());
        sunday.setDate(week.getDate());
        
        let today = new Date();

        let days = [];
        let meses = {};

        for(let i = 0; i < 7; i++){
            if(today.getDate() === sunday.getDate() &&
                today.getMonth() === sunday.getMonth() &&
                today.getFullYear() === sunday.getFullYear())
                days.push(<span class='today'> {sunday.getDate()} </span>);
            else
                days.push(sunday.getDate());

            meses[sunday.getMonth()] = meses[sunday.getMonth()]? meses[sunday.getMonth()]+1 : 1;
            sunday.setDate(sunday.getDate() + 1);
        }

        return (
            <div id="cronograma-semanal" class="cronograma-semanal">
                <h2>Cronograma da Sala</h2>
                <div class='botoes'>
                {
                    this.state.sala ? (
                        <button onClick={() => this.prevWeek()}>&lt; Voltar</button>
                    ) : (<span/>)
                }
                    <select onChange={(event) => this.selectInstitute(event.target.value)}>
                        <option value="">Selecione um instituto</option>
                        {this.renderInstitutes(this.state.institutes)}                      
                    </select>
                    <select onChange={(event) => this.selectSala(event.target.value)}>
                        <option value="">Selecione uma sala</option>
                        {this.renderSalas(this.state.salas)}                      
                    </select>
                {
                    this.state.sala ? (
                        <button onClick={() => this.nextWeek()}>Avançar &gt;</button>
                    ) : (<span/>)
                }
                </div>
                {
                    this.state.sala ? (
                        <table>
                            <thead>
                                <tr>
                                    {this.renderHeader(meses)}
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>Dom { days[0] }</th>
                                    <th>Seg { days[1] }</th>
                                    <th>Ter { days[2] }</th>
                                    <th>Qua { days[3] }</th>
                                    <th>Qui { days[4] }</th>
                                    <th>Sex { days[5] }</th>
                                    <th>Sab { days[6] }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHours(this.state.reservas)}
                            </tbody>
                        </table>
                    ):(
                        <div>
                            <h2 class='shaddow'>Escolha um instituto e uma sala para continuar</h2>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default CronogramaSemana;
