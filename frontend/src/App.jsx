import { Outlet } from "react-router-dom";
import Container from "./Components/Container";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      {/* <Container> */}
      <Outlet />
      {/* </Container> */}
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
