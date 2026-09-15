import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ShowUserDetails() {
    const { id } = useParams();
    const userId = Number(id);

    const [user, setUser] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:8080/users/${userId}/details`);
            const data = await response.json();

            console.log(data);
            setUser(data);
        }

        getUsers();
    }, [userId]);

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
                                <strong>Name:</strong> {user.Name}
                            </p>

                            <p className="card-text">
                                <strong>Email:</strong> {user.Email}
                            </p>

                            <p className="card-text">
                                <strong>Age:</strong> {user.Age}
                            </p>

                            <p className="card-text">
                                <strong>Designation:</strong> {user.Designation}
                            </p>
                            <p className="card-text">
                                <strong>Phone:</strong> {user.Phone}
                            </p>
                            <p className="card-text">
                                <strong>Address:</strong> {user.Address}
                            </p>
                            <p className="card-text">
                                <strong>City:</strong> {user.City_name}
                            </p>
                            <p className="card-text">
                                <strong>State:</strong> {user.State_name}
                            </p>
                            <p className="card-text">
                                <strong>Country:</strong> {user.Country_Name}
                            </p>


                            <Link to={`/users/${user.Id}/details/edit`}><button className="btn btn-primary">
                                Edit
                            </button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}