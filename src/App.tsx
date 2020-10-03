import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './app/components/secondary/navBar/NavBar';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<NavBar />
			</div>
		</BrowserRouter>
	);
}

export default App;
