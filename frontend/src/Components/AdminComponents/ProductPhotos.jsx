import { useState } from "react";

const ProductPhotos = () => {
  const [newImage, setNewImage] = useState([]);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };
  return (
    <div className="flex justify-between">
      <div className="w-9/12">
        <h1>Current Pictures</h1>
        <div className="flex justify-start gap-5 my-5 flex-wrap ">
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/583842/pexels-photo-583842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer">
            <img
              src="https://images.pexels.com/photos/159368/laptop-iphone-coffee-notebook-159368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="input_field flex flex-col   text-center my-5 w-3/12 mx-auto">
        <label className="text-center">
          <input
            className="text-sm cursor-pointer w-36 hidden"
            type="file"
            required
            accept="image/*"
            id="avatar"
            multiple={false}
            onChange={imageChange}
          />
          {newImage.length === 0 ? (
            <div className="btn">Select New Image</div>
          ) : (
            <>
              <div className="btn">Select New Picture</div>
              <button
                className="btn ms-3 btn-info"
                // onClick={handleUpload}
                // disabled={status === "pending"}
              >
                Upload
              </button>
            </>
          )}
        </label>

        {newImage.length !== 0 && (
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer my-5">
            <img
              src={URL.createObjectURL(newImage)}
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPhotos;
