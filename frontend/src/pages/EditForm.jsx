import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditForm() {

    const { id } = useParams();
    const userId = Number(id);

    const [user, setUser] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        async function getUser() {
            const response = await fetch(
                `http://localhost:8080/users/${userId}`
            );
            const data = await response.json();
            console.log(data);
            setUser(data);
            
            // Put existing user data into form fields
            setName(data.Name);
            setEmail(data.Email);
            setAge(data.Age);
        }
        getUser();
    }, [userId]);


    async function handleSubmit(e) {
        e.preventDefault();

        const updatedUser = {
            name: name,
            email: email,
            age: Number(age)
        };

        const response = await fetch(
            `http://localhost:8080/users/${userId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {
            navigate("/");
        }
    }


    if (!user) {
        return <p>Loading...</p>;
    }


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <h3 className="text-center mb-4">
                        Edit User
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label
                                htmlFor="name"
                                className="form-label"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        <div className="mb-3">

                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="mb-3">

                            <label
                                htmlFor="age"
                                className="form-label"
                            >
                                Age
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Enter your age"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update User
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditForm;

