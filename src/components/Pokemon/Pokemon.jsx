import "./Pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemon">
      <Link to={`/Pokemon/${id}`}>
        <div className="pokemon-name">{name}</div>
        <div>
          {" "}
          <img id="image-set" src={image} />{" "}
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
