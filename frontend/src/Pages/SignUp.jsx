import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import Loader from "../Components/Loader";

const SignUp = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.password) {
      console.log("all fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("password don't match");
    }
    if (
      formData.email &&
      formData.password &&
      formData.password &&
      formData.confirmPassword
    ) {
      dispatch(registerUser(formData))
        .unwrap()
        .then((user) => {
          console.log(`Hi ${user.name} Welcome to the world of Fashion`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(formData);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      {/* Image Section */}
      <div className="md:w-1/2 p-8 hidden md:block">
        <img
          src="https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Your Image"
          className="max-w-full h-auto rounded-lg"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-1/4 p-8 my-5 w-full card card-body bg-base-300 ">
        <h1 className="text-5xl font-bold mb-5 text-center">SignUp now!</h1>
        <p className="py-6 w-11/12 mx-auto text-lg">
          Sign up now and dive into a world of cutting-edge gadgets,
          irresistible deals, and limitless possibilities!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label ">
              <span className="label-text text-xl ">Your Name</span>
            </label>
            <label className="input-group">
              <span>Name</span>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label ">
              <span className="label-text text-xl ">Your Email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                type="email"
                placeholder="info@site.com"
                className="input input-bordered w-full"
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
                type="text"
                placeholder="super secure password"
                className="input input-bordered w-full"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-xl">Confirm Your Password</span>
            </label>
            <label className="input-group">
              <span>Password</span>
              <input
                type="text"
                placeholder="super secure password"
                className="input input-bordered w-full"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button
            className="btn btn-primary  w-full"
            type="submit"
            disabled={status === "pending"}
          >
            SignUp Now{" "}
            {status == "pending" && <Loader size={15} color={"#fff"} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
