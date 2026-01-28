import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function DashboardAdmin() {
    const [societies, setSocieties] = useState(null);
 


    async function getAllSociety() {
        try {
            const response = await axios.get("http://localhost:8000/api/admin/get-society", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`
                }
            });

            setSocieties(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllSociety();
    }, [])

    async function updateStatusValidation(validation_id, status) {
        try {
            const response = await axios.post("http://localhost:8000/api/admin/update-validation", {
                validation_id: validation_id,
                status: status
            }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`
                }
            });


        } catch (error) {
            console.log(error.response)
        }
    }

 

    return (
        <>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Dashboard Admin</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Marsito Kusmawati</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" >Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>

                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>



                <div className="container">
                    <div className="card-body p-0">
                        <table className="table table-striped">
                            <thead>
                                <tr>
        <th>Id Card Number</th>
        <th>Name</th>
        <th>Address</th>
        <th>Status Validation</th>
        <th>Action</th>
    </tr>
                            </thead>
                            <tbody>
                                {societies?.map((society, index) => (

                                    <tr key={index}>
                                        <td>{society.id_card_number}</td>
                                        <td>{society.name}</td>
                                        <td>{society.address}</td>
                                        <td >
                                            <select name="" id="" onChange={(e) => updateStatusValidation(society.validation.id, e.target.value)} defaultValue={society.validation?.status}>
                                                <option value="pending">pending</option>
                                                <option value="accepted">accepted</option>
                                                <option value="rejected">rejected</option>
                                            </select>
                                           
                                        </td>
                                        <td>
                                            <Link to={`/admin/society/${society.id}`} className="btn btn-info">Detail</Link>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2024 - Web Tech ID
                    </div>
                </div>
            </footer>
        </>
    )
}