import "./App.css";
import MovieTable from "./MovieTable";
import MovieListing from "./MovieListing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { LocationContext } from "./Contexts/LocationContext";
import { MovieDataContext } from "./Contexts/MovieDataContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

function App() {
  const [location, setLocation] = useState("");
  const [allAPIData, setAllAPIData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/allMovies").then((res) => {
      setAllAPIData(res.data);
    });
  }, []);

  return (
    <Router>
      <LocationContext.Provider value={{ location, setLocation }}>
        <MovieDataContext.Provider value={{ allAPIData, setAllAPIData }}>
          <Route path="/" exact>
            <MovieTable />
          </Route>
          <Route path="/movie" exact>
            <MovieListing />
          </Route>
        </MovieDataContext.Provider>
      </LocationContext.Provider>
    </Router>
  );
}

export default App;
