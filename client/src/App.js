import { Route,  BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import DogDetail from "./components/DogDetail/DogDetail";
import Buscar from "../src/components/Buscar/Buscar";
import AgregarPerro from "./components/AgregarPerro/AgregarPerro"


function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={LandingPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/buscar" component={Buscar} />
        <Route exact path="/dog-detail/:id" component={DogDetail} />
        <Route exact path="/agregarperro" component={AgregarPerro} />
      </Router>
    </div>
  );
}

export default App;
