import { Component } from "react";
import { MenuItems } from "./MenuItems";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

class Navbar extends Component {

    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <div>
                <nav className="NavbarItems">
                    <NavLink className="navbar-logo" to="/">IC3</NavLink>

                    <div className="menu-icons" onClick={this.handleClick}>
                        <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>

                    <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                        {MenuItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink className={item.cName} to={item.endpoint}>{item.title}</NavLink>
                                </li>
                            )
                        })}
                        <button>Sign In</button>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
