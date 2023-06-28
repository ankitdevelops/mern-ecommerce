import Hero from "./Hero";

const Container = ({ children }) => {
  return <div className="md:container md:mx-auto px-4 ">{children}</div>;
};

export default Container;
