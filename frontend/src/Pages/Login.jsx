import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import Loader from "../Components/Loader";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      console.log("email is required");
    }
    if (!formData.password) {
      console.log("password is required");
    }

    if (formData.email && formData.password) {
      dispatch(loginUser(formData))
        .unwrap()
        .then((user) => {
          console.log(`welcome back ${user.name}`);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      {/* Image Section */}
      <div className="md:w-1/2 p-8 hidden md:block">
        <img
          src="https://images.pexels.com/photos/1936854/pexels-photo-1936854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Your Image"
          className="max-w-full h-auto rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-1/4 p-8 my-5 w-full card card-body bg-base-300 ">
        <h1 className="text-5xl font-bold mb-5 text-center">Welcome Back!</h1>
        <p className="py-6 w-11/12 mx-auto text-lg">
          Revive your tech experience: Log in now to discover new arrivals,
          personalized recommendations, and unbeatable offers that will leave
          you electrified!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label ">
              <span className="label-text text-xl ">Your Email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                placeholder="info@site.com"
                className="input input-bordered w-full"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-xl">Your Secure Password</span>
            </label>
            <label className="input-group">
              <span>Password</span>
              <input
                placeholder="super secure password"
                className="input input-bordered w-full"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button
            className="btn btn-primary  w-full"
            type="submit"
            disabled={status == "pending"}
          >
            Login Now{" "}
            {status == "pending" && <Loader size={15} color={"#fff"} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
