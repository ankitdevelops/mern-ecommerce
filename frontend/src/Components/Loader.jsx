import MoonLoader from "react-spinners/MoonLoader";

const Loader = ({ size, color }) => {
  return (
    <MoonLoader
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
