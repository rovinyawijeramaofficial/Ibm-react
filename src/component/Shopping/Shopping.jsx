import { useCart } from '../card/CartContext'; // Use the cart context to access cart-related functions
import { Link } from 'react-router-dom';

export default function Shopping() {
	const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart(); // Access cart state and methods

	const getTotalCost = () => {
		// Calculate the total cost; use 0 as a default if price is undefined
		return cart.reduce((total, plant) => total + ((plant.price || 0) * plant.quantity), 0).toFixed(2);
	};

	if (cart.length === 0) {
		return (
			<div className="text-center p-4 text-white">
				<h1>Shopping Cart</h1>
				<p>Your cart is empty. <Link to="/products" className="text-amber-300">Continue shopping</Link></p>
			</div>
		);
	}

	return (
		<div className="p-4 text-white">
			<h1 className="text-2xl mb-4">Shopping Cart</h1>

			{/* Display total number of plants in the cart */}
			<div className="mb-4">Total Plants in Cart: {cart.length}</div>

			{/* Display total cost of items in the cart */}
			<div className="mb-4">Total Cost: ${getTotalCost()}</div>

			{/* Continue Shopping button */}
			<div className="mb-4">
				<Link to="/products" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
					Continue Shopping
				</Link>
			</div>

			{/* List of plants in the cart */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{cart.map((plant, index) => (
					<div key={index} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4">
						<img
							src={plant.default_image?.medium_url || "https://via.placeholder.com/300"}
							alt={plant.common_name}
							className="w-full h-48 object-cover mb-4"
						/>
						<h3 className="text-xl font-bold mb-2">{plant.common_name}</h3>
						<p>Unit Price: ${plant.price ? plant.price.toFixed(2) : 'N/A'}</p>
						<p>Quantity: {plant.quantity}</p>

						<div className="flex justify-between mt-4">
							{/* Increase button */}
							<button
								onClick={() => addToCart(plant)}
								className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
							>
								+
							</button>

							{/* Decrease button */}
							<button
								onClick={() => decreaseFromCart(plant)}
								className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
								disabled={plant.quantity <= 1}
							>
								-
							</button>

							{/* Delete button */}
							<button
								onClick={() => removeFromCart(plant)}
								className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Checkout button */}
			<div className="mt-6">
				<button
					className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
					onClick={() => alert('Checkout Coming Soon!')}
				>
					Checkout
				</button>
			</div>
		</div>
	);
}
