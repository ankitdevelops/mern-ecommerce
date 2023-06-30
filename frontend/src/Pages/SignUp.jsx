import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    // Handle form submission logic here
    console.log(formData);
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
          Step into a world of style and fashion. Sign up now to unlock
          exclusive deals and curated collections just for you!
        </p>
        <form onSubmit={hand}>
          <div className="form-control mb-4">
            <label className="label ">
              <span className="label-text text-xl ">Your Email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                type="text"
                placeholder="info@site.com"
                className="input input-bordered w-full"
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
              />
            </label>
          </div>
          <button className="btn btn-primary  w-full" type="submit">
            SignUp Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
