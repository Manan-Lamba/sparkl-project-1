import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch("http://localhost:8080/users");
            const data = await response.json();

            console.log(data);
            setUsers(data);
        }

        getUsers();
    }, []);

    async function handleDelete(id){
        const response = await fetch(`http://localhost:8080/users/${id}`,
    {        
        method: "DELETE",
    }
        )
        if (response.ok) {
        setUsers(users.filter((user) => user.Id !== id));
    }
    }

    return (
        <>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8"><h3>All Users</h3></div>
                    <div className="col-md-8" style={{ border: "2px solid black", borderRadius: "30px", overflow: "hidden" }}>
                        <table className="table" style={{ border: "none" }}>
                            <thead>
                                <tr className="table-light">
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="table-group-divider">
                                {users.map((user) => (
                                    <tr key={user.Id}>
                                        <td>{user.Id}</td>
                                        <td><i class="fa-solid fa-circle-user"></i> {user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Age}</td>
                                        <td>
                                            <Link to={`/user/${user.Id}`} style={{color:"black"}}><i class="fa-solid fa-eye"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to={`/user/${user.Id}/edit`} style={{color:"black"}}><i class="fa-solid fa-pencil"></i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button onClick={() => handleDelete(user.Id)} style={{border:"none"}}><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;