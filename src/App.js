import "./App.css";
import MovieTable from "./MovieTable";
import MovieListing from "./MovieListing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import { LocationContext } from "./Contexts/LocationContext";

function App() {
  const [location, setLocation] = useState("");

  return (
    <Router>
      <div>
        <h1>The Movie Website</h1>
        <LocationContext.Provider value={{ location, setLocation }}>
          <Route path="/" exact>
            <MovieTable />
          </Route>
          <Route path="/movie" exact>
            <MovieListing />
          </Route>
        </LocationContext.Provider>
      </div>
    </Router>
  );
}

export default App;
