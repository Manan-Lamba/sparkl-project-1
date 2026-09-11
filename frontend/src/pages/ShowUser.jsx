
function ShowUser() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card">
                        <div className="card-body">

                            <h3 className="card-title mb-4">
                                User Details
                            </h3>

                            <p className="card-text">
                                <strong>Name:</strong> Manan Lamba
                            </p>

                            <p className="card-text">
                                <strong>Email:</strong> manan@example.com
                            </p>

                            <p className="card-text">
                                <strong>Age:</strong> 21
                            </p>

                            <button className="btn btn-primary">
                                Edit
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShowUser;

