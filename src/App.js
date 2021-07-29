import React from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
	return (
		<div className="App">
		<h1>🐍 Snaky 🐍</h1>
		<Grid blocks={10}/>
		</div>
	)
}

export default App;
