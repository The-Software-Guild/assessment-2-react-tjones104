import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import PostInstruments from "./components/postInstruments";
import GetInstruments from "./components/getInstruments";
import PutInstruments from "./components/putInstruments";
import DeleteInstruments from "./components/deleteInstruments";
import UnknownPage from "./components/UnknownPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/GetInstruments" element={<GetInstruments />}></Route>
            <Route
              path="/PostInstruments"
              element={<PostInstruments />}
            ></Route>
            <Route path="/PutInstruments" element={<PutInstruments />}></Route>
            <Route
              path="/DeleteInstruments"
              element={<DeleteInstruments />}
            ></Route>
            <Route path="*" element={<UnknownPage />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
