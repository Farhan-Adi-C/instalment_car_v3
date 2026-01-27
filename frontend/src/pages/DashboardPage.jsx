import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function DashboardPage(){
    const [society, setSociety] = useState(null);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function getSociety() {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/api/get-society", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setSociety(response.data);

            setLoading(false);
        } catch (error) {
            
        }
    }

    async function getApplication() {

        try {
           

            const response = await axios.get("http://localhost:8000/api/applications", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setApplication(response.data.instalments);
            console.log(response.data.instalments)
        

        } catch (error) {
            
        }
    }

    async function logout() {
        try {
            const response = await axios.post("http://localhost:8000/api/logout", {}, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            navigate("/login");
            localStorage.removeItem("token");
        } catch (error) {
            
        }
    }
 

    useEffect(() => {
        getSociety();
        getApplication(); 
       
    }, []);


    if(loading) {
        return (
            <>
            
<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div className="container">
        <a className="navbar-brand" href="#">Installment Cars</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" href="#">Marsito Kusmawati</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Logout</Link>
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

    <h5>Loading...</h5>
</main>
            </>
        )
    }

    return (
        <>
        
<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div className="container">
        <a className="navbar-brand" href="#">Installment Cars</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" href="#">Marsito Kusmawati</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>Logout</Link>
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
 
        <section className="validation-section mb-5">
            <div className="section-header mb-3">
                <h4 className="section-title text-muted">My Data Validation</h4>
            </div>
            <div className="row">
                {!society?.validation && (

                <div className="col-md-4">
                    <div className="card card-default">
                        <div className="card-header">
                            <h5 className="mb-0">Data Validation</h5>
                        </div>
                        <div className="card-body">
                            <Link to={"/form-validation"} className="btn btn-primary btn-block">+ Request validation</Link>
                        </div>
                    </div>
                </div>
                )}
 
        
        {society?.validation?.status == "pending" && (

                <div className="col-md-4">
                    <div className="card card-default">
                        <div className="card-header border-0">
                            <h5 className="mb-0">Data Validation</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <tbody>
                                <tr>
                                    <th>Status</th>
                                    <td><span className="badge badge-info">Pending</span></td>
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
                                    <td className="text-muted">{society?.validation.validator_notes ?? "-"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        )} 
        {society?.validation?.status == "accepted" && (
 
 
                <div className="col-md-4">
                    <div className="card card-default">
                        <div className="card-header border-0">
                            <h5 className="mb-0">Data Validation</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <tbody>
                                <tr>
                                    <th>Status</th>
                                    <td><span className="badge badge-success">Accepted</span></td>
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
                                    <td className="text-muted">{society?.validation.validator_notes ?? "-"}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        )}

            </div>
        </section>
 
        <section className="validation-section mb-5">
            <div className="section-header mb-3">
                <div className="row">
                    <div className="col-md-8">
                        <h4 className="section-title text-muted">My Installment Cars</h4>
                    </div>
                    {!society?.application && society?.validation?.status == "accepted" && (

                    <div className="col-md-4">
                        <Link to={"/instalment-car"} className="btn btn-primary btn-lg btn-block">+ Add Installment Cars</Link>
                    </div>
                    )}
                </div>
            </div>
            <div className="section-body">
                <div className="row mb-4">
 
                    {society?.validation?.status !== "accepted" && (

                    <div className="col-md-12">
                        <div className="alert alert-warning">
                            Your validation must be approved by validator to Installment Cars.
                        </div>
                    </div>
                    )}
 
                {society?.validation?.status == "accepted" && application?.application.apply_status == "pending" && (

                    <div className="col-md-6">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">{application?.car}</h5>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <td className="text-muted">{application?.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td className="text-muted">Rp. {Number(application?.price).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Installment</th>
                                        <td className="text-muted">
                                           {application?.application?.month} Month <span className="badge badge-info">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Apply Date</th>
                                        <td className="text-muted">{new Date(application?.application.created_at).toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Notes</th>
                                        <td className="text-muted">{application?.application.notes}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
 

    {society?.validation?.status == "accepted" && application?.application.apply_status == "accepted" && (
                    <div className="col-md-6">
                        <div className="card card-default">
                            <div className="card-header border-0">
                                <h5 className="mb-0">{application?.car}</h5>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <td className="text-muted">{application?.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td className="text-muted">Rp. {Number(application?.price).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Installment</th>
                                        <td className="text-muted">
                                             {application?.application?.month} Month <span className="badge badge-success">Accepted</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Apply Date</th>
                                        <td className="text-muted">{new Date(application?.application.created_at).toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Notes</th>
                                        <td className="text-muted">{application?.application.notes}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    )}
 

                </div>
                 

            </div>
        </section>


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