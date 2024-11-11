import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase.init";


const Register = () => {

    const handleRegister = (event)=>{
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log(email,password)
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error)
        })

    }



  return (
    <div className="w-4/5 mx-auto">
      <h2 className="text-3xl mb-3 mt-10 text-center">Register</h2>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
