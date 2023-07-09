import React, {useContext} from 'react'
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import { AuthContext } from './components/contexts/AuthContext';


function App() {
  const {user, signedIn} = useContext(AuthContext)
  return (
    <BrowserRouter>
          <div className="App">
            <Navbar/>
            {signedIn && <Route exact path="/" component={Dashboard}/>}
            {!signedIn && <Route  path="/signup" component={Signup}/>}
            {!signedIn && <Route path="/signin" component={Signin}/>}
          </div>
    </BrowserRouter>
  );
}

export default App;
