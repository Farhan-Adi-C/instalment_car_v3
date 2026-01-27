import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"


export default function DetailInstalment() {
    const { id } = useParams();
    const [instalment, setInstalment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nominal, setNominal] = useState(0);
    const [month, setMonth] = useState(0);
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    async function getApplication() {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/api/instalment_cars/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setInstalment(response.data.instalment)
            setLoading(false)


        } catch (error) {

        }
    }

    async function handleForm(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/applications`, {
                instalment_id: id,
                month: month,
                notes: notes
            }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("success");
            navigate("/")
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
        getApplication();
    }, [])

    useEffect(() => {
        setNominal(instalment?.price / month)
    }, [month])

    if (loading) {
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
                                <a className="nav-link" href="#">Marsito Kusmawati</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>

                <header className="jumbotron">
                    <div className="container text-center">
                        <div>
                            <h1 className="display-4">{instalment?.car}</h1>
                            <span className="text-muted">Brand : {instalment?.brand}</span>
                        </div>
                    </div>
                </header>

                <div className="container">

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Description</h3>
                                {instalment?.description}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Price : <span className="badge badge-primary">Rp. {Number(instalment?.price).toLocaleString()}</span></h3>
                            </div>
                        </div>
                    </div>

<form onSubmit={handleForm}>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Select Months</h3>
                                <select onChange={(e) => setMonth(e.target.value)} name="months" defaultValue={" "} className="form-control">
                                    <option disabled value=" " >Select month</option>
                                    {instalment?.month?.map((month, index) => (
                                        <option key={index} value={month.month}>{month.description} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Nominal/Month : <span className="badge badge-primary">Rp. {month == 0 ? "-" :  nominal}</span></h3>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Notes</label>
                                </div>
                                <textarea onChange={(e) => setNotes(e.target.value)} className="form-control" cols="30" rows="6" placeholder="Explain why your installment should be approved"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <button type="submit" className="btn btn-primary btn-lg">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
</form>
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