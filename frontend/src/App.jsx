import { Outlet } from "react-router-dom";
import Container from "./Components/Container";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
