import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import './index.css'

const Header = () => {
    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");

    return (
        <nav className="navbar navbar-dark bg-white border-bottom">
            {/*<button onClick={() => console.log(splitLocation)}></button>*/}
            <nav className="">
                <ul className="nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="active"
                                 className={`${splitLocation[1] === '' ? 'active-nav nav-link' : 'nav-link '}`}>Home</NavLink>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <a className="nav-link" href="/Learn">Learn</a>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Link className={splitLocation[1] === 'practice' ? 'active-nav nav-link' : 'nav-link'} to="/practice">Practice</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={splitLocation[1] === 'tricks' ? 'active-nav nav-link' : 'nav-link '} to="/tricks">Tricks</Link>
                    </li>
                </ul>
            </nav>
        </nav>
    )
}
export default Header