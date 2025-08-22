import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div>
      <h1>This is Unauthorized component</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Unauthorized;