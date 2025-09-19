import { NavLink } from "react-router-dom";

const Header = () => (
  <div className="flex space-x-2">
    <NavLink exact activeClassName="underline font-bold" to="/">
      Home
    </NavLink>
    <NavLink exact activeClassName="underline font-bold" to="/product">
      Product
    </NavLink>
  </div>
);

export default Header;
