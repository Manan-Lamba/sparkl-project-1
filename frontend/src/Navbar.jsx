import sparkl from './assets/sparkllogo.png'

function Navbar() {
    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={sparkl} alt="Logo" style={{width:"200px", height:"50px"}} className="d-inline-block align-text-top"/>
                    </a>
                    <button type="button" class="btn btn-primary">Create New User</button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
