import React from "react";
import Container from "../Components/Container";
import Rating from "../Components/Rating";

const ProductDetails = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-10 items-center my-10 ">
        <div className="col-span-2 md:col-span-1 md:order-1">
          <div className="md:w-10/12 mx-auto md:ms-0">
            <img
              src="https://images.pexels.com/photos/207589/pexels-photo-207589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Product Image"
              className="w-full rounded-xl"
            />
          </div>
          <div className="flex justify-start gap-5 my-5 flex-wrap ">
            <div className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  "
                alt="Shoes"
                className="object-cover h-full w-full rounded-xl"
              />
            </div>
            <div className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/583842/pexels-photo-583842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Shoes"
                className="object-cover h-full w-full rounded-xl"
              />
            </div>
            <div className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Shoes"
                className="object-cover h-full w-full rounded-xl"
              />
            </div>
            <div className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Shoes"
                className="object-cover h-full w-full rounded-xl"
              />
            </div>
            <div className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/159368/laptop-iphone-coffee-notebook-159368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Shoes"
                className="object-cover h-full w-full rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 md:order-2">
          <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className=" text-3xl lg:text-4xl title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>
            <div className="flex mb-4">
              <Rating />
            </div>
            <p className="leading w-full text-xl font-medium">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>

            <div className="flex mt-10 items-center">
              <p>
                <span className="text-3xl font-bold   ">₹ 6000</span>
              </p>
              <button className="btn btn-primary ms-5 w-44 lg:btn-wide">
                Add To Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
