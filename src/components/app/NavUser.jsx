import { Link } from "react-router";

const NavUser = () => {
  return (
    <nav className="bg-pink-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-14 text-white">
          
          {/* Left Side - Logo & Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors"
            >
              Logo
            </Link>
          </div>

          {/* Right Side - Auth Links */}
          <div className="flex items-center gap-4">
            {/* <Link
              to="about"
              className="text-white hover:text-yellow-200 transition duration-200"
            >
              About
            </Link>            
            <Link
              to="register"
              className="px-4 py-2 rounded-lg bg-white text-pink-600 font-semibold hover:bg-yellow-200 transition duration-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-pink-600 transition duration-200"
            >
              Login
            </Link> */}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavUser;