import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

import PropTypes from 'prop-types';
export function CartProvider({ children }) {

	CartProvider.propTypes = {
		children: PropTypes.node.isRequired,
	}; const [cart, setCart] = useState([]);

	const addToCart = (item) => {
		setCart((prevCart) => [...prevCart, item]);
	};

	const cartCount = cart.length;

	return (
		<CartContext.Provider value={{ cart, addToCart, cartCount }}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
