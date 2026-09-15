import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch("http://localhost:8080/users/details");
            const data = await response.json();

            console.log(data);
            setUsers(data);
        }

        getUsers();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">City Name</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.Id}>
                        <td>{user.Id}</td>
                        <td><i class="fa-solid fa-circle-user"></i> {user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.Age}</td>
                        <td>{user.Designation}</td>
                        <td>{user.Phone}</td>
                        <td>{user.Address}</td>
                        <td>{user.City_name}</td>
                        <td>
                            <Link to={`/users/${user.Id}/details`} style={{ color: "black" }}><i class="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to={`/users/${user.Id}/details/edit`} style={{ color: "black" }}><i class="fa-solid fa-pencil"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => handleDelete(user.Id)} style={{ border: "none" }}><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}