import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from "./component/Landing/LandingPage.jsx";
import Product from "./component/Product/Product.jsx";
import Shopping from "./component/Shopping/Shopping.jsx";
import { CartProvider, useCart } from './component/card/CartContext.jsx';
import { SpeedInsights } from '@vercel/speed-insights/react';

import "./App.css";

function App() {
	return (
		<CartProvider>
			<Router>
				<div>
					<nav>
						<ul className='absolute top-0 flex justify-around w-full mb-96 bg-zinc-900 h-10'>
							<li>
								<Link className='text-white hover:text-amber-300' to="/">LandingPage</Link>
							</li>
							<li>
								<Link className='text-white hover:text-amber-300' to="/products">Product</Link>
							</li>
							<li>
								<Link className='text-white hover:text-amber-300' to="/shopping">Shopping</Link>
							</li>
							<li>
								<CartIcon className="" />
							</li>
						</ul>
					</nav>

					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/products" element={<Product />} />
						<Route path="/shopping" element={<Shopping />} />
					</Routes>
				</div>
			</Router>
			<SpeedInsights />
		</CartProvider>
	);
}

function CartIcon() {
	const { cartCount } = useCart();

	return (
		<Link to="/shopping" className='relative inline-block'>
			<img
				src="/icons8-cart-64.png"
				alt="Shopping Cart"
				className='w-6 h-6'
			/>
			{cartCount > 0 && (
				<span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1'>
					{cartCount}
				</span>
			)}
		</Link>
	);
}

export default App;
