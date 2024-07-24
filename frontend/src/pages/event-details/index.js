import Navbar from "./../../components/navbar";
import { Link } from "react-router-dom";

export default function Event() {
    return (
      <div>
        <Navbar/>
        <div className="grid grid-cols-2">
            <div>
                <h1>Competition 01</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu vulputate. Phasellus ultrices non metus et interdum. Aliquam eleifend odio sed eleifend porttitor.</p>
                <Link to="/events/detail-events/regist-events">
                    <button className="bg-primary-2 px-5 rounded-lg py-2 text-white">Regist Now</button>
                </Link>
            </div>
            <div>

            </div>
        </div>
      </div>
    );
  }