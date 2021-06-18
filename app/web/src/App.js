import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateProject from "./CreateProject";
import Home from './Home';
import Login from "./Login";
import Project from "./Project";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/projects/submit" component={CreateProject} />
        <Route path="/projects/:id" component={Project} />
      </Switch>
    </Router>
  );
}

export default App;
