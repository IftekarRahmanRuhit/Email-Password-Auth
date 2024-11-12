import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase.init";
import { useState } from "react";


const Register = () => {
  const [success, setSuccess] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')




    const handleRegister = (event)=>{
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        // reset error status 
        setErrorMessage('')
        setSuccess(false)

        if(password.length < 6){
          setErrorMessage('Password should in 6 Characters')
          return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('Password should contain At least one uppercase, one lowercase, one number, one special character');
            return;
        }

        console.log(email,password)
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            setSuccess(true)
        })
        .catch(error => {
            console.log(error.message)
            setErrorMessage(error.message)
            setSuccess(false)
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
        {
          errorMessage && 
          <p className="text-red-600 text-center mb-2 font-bold px-1">{errorMessage}</p>
        }
        {
          success && 
          <p className="text-green-600 text-center mb-2 font-bold">Sign up successfull</p>
        }
      </div>
    </div>
  );
};

export default Register;
