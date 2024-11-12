import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setSuccess(false);
    setLoginErrorMessage("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if(!result.user.emailVerified){
          loginErrorMessage('Please verify your mail')
        }
        else{
          setSuccess(true);
        }

      })
      .catch((error) => {
        console.log(error.message);
        setLoginErrorMessage(error.message);
      });
  };

  const handleForgetPassword =()=>{

    const email = emailRef.current.value

    if(!email){
      alert('Please provide a valid email address')
    }
    else{
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert('Password reset email sent, please Check your email')
      })
    }

  }




  return (
    <div className="w-4/5 mx-auto">
      <div className="hero bg-base-200 min-h-screen mt-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  ref={emailRef}
                  required
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
                  required
                />
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
              <p className="text-center">Don't have an account? <Link to='/register' className="text-blue-500 underline">Register</Link></p>
            </form>
            


            { loginErrorMessage && (
              <p className="text-red-600 text-center mb-2 font-bold px-1">
                { loginErrorMessage}
              </p>
            )}

            {success && (
              <p className="text-green-600 text-center mb-2 font-bold">
                Login successfull
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
