import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function LoginAdmin() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleForm(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/api/admin/login", {
                email: email,
                password: password
            }, {
                headers: {
                    Accept: "application/json"
                }
            });

            localStorage.setItem("admin-token", response.data.token);
            alert("success")
            setLoading(false);
            navigate("/admin");
        } catch (error) {
            console.log(error);
            
        }
    } 


    return(
        <>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div className="container">
        <a className="navbar-brand" href="#">Installment Cars</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
                
            </ul>
        </div>
    </div>
</nav>

<main>
 
    <header className="jumbotron">
        <div className="container text-center">
            <h1 className="display-4">Installment Cars</h1>
        </div>
    </header>
 

    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6" >
                <form className="card card-default" onSubmit={handleForm}>
                    <div className="card-header">
                        <h4 className="mb-0">Login</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group row align-items-center">
                            <div className="col-4 text-right">Email</div>
                            <div className="col-8"><input onChange={(e) => setEmail(e.target.value)}  type="email" className="form-control" /></div>
                        </div>
                        <div className="form-group row align-items-center">
                            <div className="col-4 text-right">Password</div>
                            <div className="col-8"><input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" /></div>
                        </div>
                        <div className="form-group row align-items-center mt-4">
                            <div className="col-4"></div>
                            <div className="col-8"><button disabled={loading} type="submit" className="btn btn-primary">Login</button></div>
                        </div>
                    </div>
                </form>
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