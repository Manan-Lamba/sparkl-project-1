


function NewForm() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <h3 className="text-center mb-4">
                        Add User
                    </h3>

                    <form>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name" required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email" required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                placeholder="Enter your age" required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Add User
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default NewForm;

