import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewForm() {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[age, setAge] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            age: age
        }

        const response = await fetch("http://localhost:8080/users",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            navigate("/");
        }

    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <h3 className="text-center mb-4">
                        Add User
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name" required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
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

