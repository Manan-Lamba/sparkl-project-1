
import sparkl from './assets/sparkllogo.png';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid">

                    <Link to="/users/details" className="navbar-brand">
                        <img
                            src={sparkl}
                            alt="Logo"
                            style={{ width: "200px", height: "50px" }}
                            className="d-inline-block align-text-top"
                        />
                    </Link>

                    <Link to="/new">
                        <button className="btn btn-primary">
                            Create New User
                        </button>
                    </Link>

                </div>
            </nav>
        </>
    );
}

export default Navbar;

