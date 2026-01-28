import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailSociety() {
    const { id } = useParams();
    const [society, setSociety] = useState(null);
    const [isAddNotes, setIsAddNotes] = useState(false);
    const [notes, setNotes] = useState("");

    async function getSociety() {
        try {
            const response = await axios.get(`http://localhost:8000/api/admin/get-society/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`
                }
            });

            setSociety(response.data)

        } catch (error) {

        }

    }

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

    async function updateStatusApplication(application_id, apply_status) {
        try {
            const response = await axios.post("http://localhost:8000/api/admin/update-application", {
                application_id: application_id,
                apply_status: apply_status
            }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`
                }
            });


        } catch (error) {
            console.log(error.response.data);

        }
    }

    async function updateNotesValidation(validation_id) {
        try {
            await axios.post("http://localhost:8000/api/admin/update-validation-notes",  {
                validation_id: validation_id,
                notes: notes
            }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`
                }
            });
            
            setIsAddNotes(false);
            getSociety();
        } catch (error) {
            console.log(error.response.data);
            
        }
    }


    useEffect(() => {
        getSociety()
    }, [])

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
                        <h1 className="display-4">Detail Society</h1>
                    </div>
                </header>



                <div className="container">
                    <div className="card p-2">
                        <h2>{society?.name}</h2>

                        <div className="d-flex mt-3">
                            {society?.validation && (

                                <div className="col-md-6">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Data Validation</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td><select name="" id="" defaultValue={society?.validation.status} onChange={(e) => updateStatusValidation(society?.validation.id, e.target.value)}>
                                                            <option value="pending">pending</option>
                                                            <option value="accepted">accepted</option>
                                                            <option value="rejected">rejected</option>
                                                        </select></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Job</th>
                                                        <td className="text-muted">{society?.validation.job}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Income/Month</th>
                                                        <td className="text-muted">Rp. {Number(society?.validation.income).toLocaleString("ID-id")}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <td className="text-muted">{society?.validation.validator?.name ?? "-"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator Notes</th>
                                                        <td className="text-muted">{society?.validation.validator_notes ??
                                                            <>
                                                            {isAddNotes && (
                                                                <div className="d-flex" style={{width: "50px"}}>
                                                                <input type="text" onChange={(e) => setNotes(e.target.value)} width={100} placeholder="add notes" style={{width: "180px"}}/>
                                                                <button type="submit " onClick={() => updateNotesValidation(society.validation.id)} className="btn btn-success">+</button>
                                                                </div>
                                                            )}
                                                            {!isAddNotes && (

                                                                <button className="btn btn-primary btn-sm" onClick={() => setIsAddNotes(true)}>+</button>
                                                            )}
                                                            </>
                                                        }</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {society?.application && (
                                <div className="col-md-6">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">{society.application?.instalment.car}</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Description</th>
                                                        <td className="text-muted">{society.application?.instalment.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Price</th>
                                                        <td className="text-muted">Rp. {Number(society.application?.instalment.price).toLocaleString()}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Installment</th>
                                                        <td className="text-muted">
                                                            {society.application?.month} Month <select name="" id="" defaultValue={society?.application.apply_status} onChange={(e) => updateStatusApplication(society?.application.id, e.target.value)}>
                                                                <option value="pending">pending</option>
                                                                <option value="accepted">accepted</option>
                                                                <option value="rejected">rejected</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Apply Date</th>
                                                        <td className="text-muted">{new Date(society.application?.created_at).toDateString()}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Notes</th>
                                                        <td className="text-muted">{society.application?.notes}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="mt-3">
                            <Link to={"/admin"} className="btn btn-primary">Back to Dashboard</Link>
                            </div>
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