import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../Firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const terms = event.target.terms.checked


    // reset error status
    setErrorMessage("");
    setSuccess(false);

    if(!terms){
      setErrorMessage('Please Accept Our Terms And Condition')
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password should in 6 Characters");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password should contain At least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send email verification 
        sendEmailVerification(auth.currentUser)
        .then(()=>{
        console.log('verification mail sent')
        })

      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

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
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute right-4 top-12"
            >
              {/* <FaEye /> */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <div className="form-control">
              <label className="label justify-start gap-3 cursor-pointer ">
                <input type="checkbox" name = 'terms' className="checkbox mt-2" />
                <span className="label-text mt-2">
                  Accept Our Terms and Condition.
                </span>
              </label>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <p className="text-center">Already have an account? <Link to='/login' className="text-blue-500 underline">Login</Link></p>




        </form>
        {errorMessage && (
          <p className="text-red-600 text-center mb-2 font-bold px-1">
            {errorMessage}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-2 font-bold">
            Sign up successfull
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
