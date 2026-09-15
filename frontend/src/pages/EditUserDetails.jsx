import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditUserDetails() {
    const { id } = useParams();
    const userId = Number(id);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        designation: "",
        phone: "",
        address: "",
        city_id: ""
    });

    const [cities, setCities] = useState([]);

    // Get existing user details
    useEffect(() => {
        async function getUserDetails() {
            try {
                const response = await fetch(
                    `http://localhost:8080/users/${userId}/details`
                );

                const data = await response.json();

                console.log("User details:", data);

                setFormData({
                    designation: data.Designation,
                    phone: data.Phone,
                    address: data.Address,
                    city_id: data.City_id
                });

            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }

        getUserDetails();
    }, [userId]);


    // Get cities for dropdown
    useEffect(() => {
        async function getCities() {
            try {
                const response = await fetch(
                    "http://localhost:8080/city"
                );

                const data = await response.json();

                console.log("Cities:", data);

                setCities(data);

            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        }

        getCities();
    }, []);


    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    // Submit updated details
    async function handleSubmit(e) {
        e.preventDefault();

        const updatedDetails = {
            designation: formData.designation,
            phone: formData.phone,
            address: formData.address,
            city_id: Number(formData.city_id)
        };

        console.log("Sending:", updatedDetails);

        try {
            const response = await fetch(
                `http://localhost:8080/users/${userId}/details`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedDetails)
                }
            );

            const data = await response.json();

            console.log("Backend response:", data);

            if (response.ok) {
                navigate(`/users/${userId}/details`);
            }

        } catch (error) {
            console.error("Error updating user details:", error);
        }
    }


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <h3 className="text-center mb-4">
                        Edit User Details
                    </h3>

                    <form onSubmit={handleSubmit}>

                        {/* Designation */}
                        <div className="mb-3">

                            <label
                                htmlFor="designation"
                                className="form-label"
                            >
                                Designation
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter your designation"
                                required
                            />

                        </div>


                        {/* Phone */}
                        <div className="mb-3">

                            <label
                                htmlFor="phone"
                                className="form-label"
                            >
                                Phone
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone"
                                required
                            />

                        </div>


                        {/* Address */}
                        <div className="mb-3">

                            <label
                                htmlFor="address"
                                className="form-label"
                            >
                                Address
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                required
                            />

                        </div>


                        {/* City */}
                        <div className="mb-3">

                            <label
                                htmlFor="city_id"
                                className="form-label"
                            >
                                City
                            </label>

                            <select
                                className="form-select"
                                id="city_id"
                                name="city_id"
                                value={formData.city_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select City
                                </option>

                                {cities.map((city) => (
                                    <option
                                        key={city.Id}
                                        value={city.Id}
                                    >
                                        {city.Name}
                                    </option>
                                ))}

                            </select>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Details
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
