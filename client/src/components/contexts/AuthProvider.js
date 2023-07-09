import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/signin" exact component={SignIn} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}