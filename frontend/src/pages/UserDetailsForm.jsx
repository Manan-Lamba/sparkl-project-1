import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDetailsForm() {
    const [formData, setFormData] = useState({
        designation: "",
        phone: "",
        address: "",
        city_id: ""
    });

    // cities
    const [cities, setCities] = useState([]);
    useEffect(() => {
        async function getCities() {
            const response = await fetch("http://localhost:8080/city");
            const data = await response.json();
            console.log(data);
            setCities(data);
        }
        getCities();
    }, [])


    const { id } = useParams();
    const userId = Number(id);

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            designation: formData.designation,
            phone: formData.phone,
            address: formData.address,
            city_id: Number(formData.city_id)
        }

        console.log("Sending user:", user);

        const response = await fetch(`http://localhost:8080/users/${userId}/details`,
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
                        Create User Details
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="designation" className="form-label">
                                designation
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="designation"
                                name="designation"
                                placeholder="Enter your name" required
                                value={formData.designation}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                phone
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Enter your email" required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Enter your age" required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_id" className="form-label">
                                city_id
                            </label>
                            <select className="form-select" aria-label="Default select example" name="city_id"
                                value={formData.city_id}
                                onChange={handleChange}
                                required>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.Name}
                                    </option>
                                ))}
                            </select>
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