import vite from "../../../public/vite.svg";
import { Link } from "react-router-dom";

export default function LandingPage() {
	return (
		<div className="relative flex flex-col items-center justify-center">
			<img src={vite} className="w-96 object-cover opacity-10 mx-auto" alt="background" />
			<div className="absolute z-10 text-center">
				<h1 className="text-orange-600 m-10">Brave1</h1>
				<p className="text-white text-2xl w-96 opacity-50">
					Brave1 is a modern company that provides services for other companies and makes sure that customers understand what really matters in front-line operations.
				</p>
			</div>
			<div>
				<Link to="/products"
					className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700 transition no-underline hover:text-white "
				>
					Learn More
				</Link>
			</div>
		</div >
	);
}
