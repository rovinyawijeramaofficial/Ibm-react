import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
	CartProvider.propTypes = {
		children: PropTypes.node.isRequired,
	};

	const [cart, setCart] = useState([]);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(plant => plant.id === item.id);
			if (existingItem) {
				// Increment quantity if item already exists
				return prevCart.map(plant =>
					plant.id === item.id ? { ...plant, quantity: plant.quantity + 1 } : plant
				);
			} else {
				// Add new item with quantity 1
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	};

	const decreaseFromCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(plant => plant.id === item.id);
			if (existingItem && existingItem.quantity > 1) {
				// Decrement quantity if it's greater than 1
				return prevCart.map(plant =>
					plant.id === item.id ? { ...plant, quantity: plant.quantity - 1 } : plant
				);
			} else {
				// Remove item if quantity is 1
				return prevCart.filter(plant => plant.id !== item.id);
			}
		});
	};

	const removeFromCart = (item) => {
		setCart((prevCart) => prevCart.filter(plant => plant.id !== item.id));
	};

	const cartCount = cart.reduce((total, plant) => total + plant.quantity, 0); // Total items in the cart

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseFromCart, cartCount }}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
