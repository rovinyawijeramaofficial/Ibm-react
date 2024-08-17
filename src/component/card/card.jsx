import { useState, useEffect } from "react";
import axios from "axios";

export default function Card() {
	const [plantData, setPlantData] = useState([]);
	const [cart, setCart] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	async function fetchData() {
		try {
			let response = await axios.get(
				`https://perenual.com/api/species-list?key=sk-l9dG66bbcafd5af906512`
			);
			let data = response.data.data; // Get the array of plant data
			setPlantData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	const handleAddToCart = (plant) => {
		setCart((prevCart) => [...prevCart, plant]);
		setCartCount((prevCount) => prevCount + 1);
	};

	const groupedPlants = plantData.reduce((groups, plant) => {
		const category = plant.cycle; // Use cycle or any other property for grouping
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(plant);
		return groups;
	}, {});

	if (plantData.length === 0) {
		return <div className="text-center p-4 text-white">Loading...</div>;
	}

	return (
		<div>
			<div className="text-white text-xl mb-4">Cart Count: {cartCount}</div>
			<div className="grid gap-8 p-4">
				{Object.keys(groupedPlants).map((category) => (
					<div key={category}>
						<h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{groupedPlants[category].map((plant) => (
								<div
									key={plant.id}
									className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden"
								>
									<img
										src={plant.default_image?.medium_url || "https://via.placeholder.com/300"}
										alt={plant.common_name}
										className="w-full h-48 object-cover"
									/>
									<div className="p-4">
										<h3 className="text-xl font-bold mb-2 text-white">{plant.common_name}</h3>
										<p className="text-gray-300">
											<strong>Scientific Name:</strong> {plant.scientific_name?.join(", ")}
										</p>
										<p className="text-gray-300">
											<strong>Other Name:</strong> {plant.other_name?.join(", ")}
										</p>
										<p className="text-gray-300">
											<strong>Cycle:</strong> {plant.cycle}
										</p>
										<p className="text-gray-300">
											<strong>Watering:</strong> {plant.watering}
										</p>
										<p className="text-gray-300">
											<strong>Sunlight:</strong> {plant.sunlight?.join(", ")}
										</p>
										<button
											onClick={() => handleAddToCart(plant)}
											disabled={cart.some(item => item.id === plant.id)}
											className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-500"
										>
											{cart.some(item => item.id === plant.id) ? "Added" : "Add to Cart"}
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
