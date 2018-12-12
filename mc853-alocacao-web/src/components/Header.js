import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./../styles/Header.css";
import "./../assets/unicamp.svg";
import {LogadoOuNaoLogadoEisAQuestao} from "./App";

var UnicampLogo = require('./../assets/unicamp.svg');

class Header extends Component {
    render() {
        return (
            <header id="header" class="header">
                <a href={"#"} class={"logo"}>
                    <img src={UnicampLogo} class="unicamp-logo"/>
                </a>

                <div class={"header-buttons"}>
                    <a href={"#"} class="h-btn">
                        Opções
                    </a>
                    <Link to={'/login'} class="h-btn" onClick={() => this.props.setLogado(false)}>
                        Sair
                    </Link>
                </div>
            </header>
        );
    }
}

export default Header;
