import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Piano Center</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/getInstruments">Get</Link>
        <Link to="/postInstruments">Post</Link>
        <Link to="/putInstruments">Put</Link>
        <Link to="/deleteInstruments">Delete</Link>
      </div>
    </nav>
  );
};

export default Navbar;
