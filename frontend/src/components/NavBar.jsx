import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <Link to="/">Quote App</Link>
        <br />
        <br />
        {token ? (
          <>
            <Link to="/profile">Profile</Link>&nbsp;&nbsp;
            <Link to="/create">create</Link> &nbsp;&nbsp;
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>&nbsp;&nbsp;
            <Link to="/signup">Signup</Link>&nbsp;&nbsp;
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
