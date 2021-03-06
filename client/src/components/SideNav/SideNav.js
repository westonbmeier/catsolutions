import React from 'react'
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "./SideNav.css";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory, useLocation } from "react-router-dom";
import AuthService from "../../Services/AuthService";

export default function SideNavBar() {

    let location = useLocation();
    let history = useHistory();

    function logout(){
        AuthService.logout().then(history.push("/"));
    }

    return (
        <div className="sidenavWrapper">
            <SideNav onSelect={(selected) => { history.push(selected) }} className="shadow">
                <SideNav.Toggle />
                <SideNav.Nav>
                    <NavItem eventKey="/catsolutions" active={location.pathname === "/catsolutions" ? true : false}>
                        <NavIcon>
                            <i className="fa fa-fw fa-chart-bar" style={{ fontSize: '1.75em'}} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                    </NavText>
                    </NavItem>
                    <NavItem eventKey="/offices" active={location.pathname === "/offices" ? true : false}>
                        <NavIcon>
                            <i className="fas fa-building" style={{ fontSize: '1.5em' }} />
                        </NavIcon>
                        <NavText>
                            Offices
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/employees" active={location.pathname === "/employees" ? true : false}>
                        <NavIcon>
                            <i className="fas fa-id-badge" style={{ fontSize: '1.5em' }} />
                        </NavIcon>
                        <NavText>
                            Employees
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/equipment" active={location.pathname === "/equipment" ? true : false}>
                        <NavIcon>
                            <i className="fas fa-tools" style={{ fontSize: '1.5em' }} />
                        </NavIcon>
                        <NavText>
                            Equipment
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/contact" active={location.pathname === "/contact" ? true : false}>
                        <NavIcon>
                            <i className="far fa-envelope" style={{ fontSize: '1.5em' }} />
                        </NavIcon>
                        <NavText>
                            Contact
                        </NavText>
                    </NavItem>
                    <NavItem onClick={logout} className="mt-4">
                        <NavIcon>
                            <i className="fas fa-sign-out-alt" style={{ fontSize: '1.5em' }} />
                        </NavIcon>
                        <NavText>
                            Logout
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}
