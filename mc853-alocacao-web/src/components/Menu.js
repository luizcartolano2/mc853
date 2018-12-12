import React, {Component} from "react";
import "../styles/Menu.css";

import {Link} from "react-router-dom";

const fakePages = [{nome: 'Page1'}, {nome: 'Page2'}, {nome: 'Page3'}];

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderOptions = (list) => {
        let menu = [];

        for (let i in list) {
            menu.push(<li data-url={list[i].url} class={window.location.pathname === list[i].url ? 'active' : ''}>
                <Link to={list[i].url}>{list[i].nome}</Link>
            </li>);
        }

        return menu;
    };

    render() {
        const {list} = this.props;
        return (
            <div id="user-menu">
                <ul>{this.renderOptions(list)}</ul>
            </div>
        );
    }
}

export default Menu;
