import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function FormValidation() {
    const [haveJob, setHaveJob] = useState(true);
    const [job, setJob] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [income, setIncome] = useState(0);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if(!haveJob) {
            setJob("");
            setJobDescription("");
            setIncome(0);

        }
    }, [haveJob])


    async function handleForm(e) {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8000/api/validation/store", {
                job: job, 
                job_description: jobDescription, 
                income: income,
                reason_accepted: reason
            }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("success")
            setLoading(false);
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


    return(
        <>
        
<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container">
        <a class="navbar-brand" href="#">Installment Cars</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Link class="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>

<main>
 
    <header class="jumbotron">
        <div class="container">
            <h1 class="display-4">Request Data Validation</h1>
        </div>
    </header> 
    <div class="container">

        <form onSubmit={handleForm}>
            <div class="row mb-4">

                <div class="col-md-6">
                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label class="mr-3 mb-0">Are you working?</label>
                            <select class="form-control-sm" onChange={(e) => e.target.value == "yes" ? setHaveJob(true) : setHaveJob(false)}>
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        {haveJob && (
                            <>
                            
                            <input type="text" onChange={(e) => setJob(e.target.value)} placeholder="Your Job" class="form-control mt-2 mb-2" />
                            <textarea onChange={(e) => setJobDescription(e.target.value)} class="form-control" cols="30" rows="5" placeholder="describe what you do in your job"></textarea>
                            <input onChange={(e) => setIncome(e.target.value)} type="number" placeholder="Income (Rp)" class="form-control mt-2" />
                            </>
                        )}
                    </div>
                </div>
                
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="d-flex align-items-center mb-3">
                            <label class="mr-3 mb-0">Reason Accepted</label>
                        </div>
                        <textarea onChange={(e) => setReason(e.target.value)} class="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                    </div>
                </div>
            </div>

            <button type="submit" disabled={loading} class="btn btn-primary mr-3">Send Request</button>
            <Link to={"/"} class="btn btn-secondary">Back to Dashboard</Link>

        </form>

    </div>

</main>
 
<footer>
    <div class="container">
        <div class="text-center py-4 text-muted">
            Copyright &copy; 2024 - Web Tech ID
        </div>
    </div>
</footer>
        </>
    )
}