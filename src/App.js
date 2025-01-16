import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';

function App () {
	const [gameOn, setGameOn] = useState(true);
	const [score, setScore] = useState({ score: 0, highScore: 0 });

	const gameOver = () => {
		setGameOn(false);
	}

	const resetGame = () => {
		setGameOn(true);
		setScore((prevScore) => ({
			score: 0,
			highScore: prevScore.highScore,
		}));
	}

	const incScore = () => {
		setScore((prevScore) => ({
			score: prevScore.score + 1,
			highScore:  Math.max(prevScore.highScore, prevScore.score + 1,),
		}));
	}

	return (
		<div className="App">
			<h1 id='header'>🐍 Snaky 🐍</h1>
			<Grid
				gameOn={gameOn}
				gameOver={gameOver}
				resetGame={resetGame}
				incScore={incScore}
			/>
			{!gameOn && <h2>press Space to restart</h2>}
			<div className='scoreboard'>
				<h1>HighScore: {score.highScore}</h1>
				<h1>Score: {score.score}</h1>
			</div>
		</div>
	);
}

export default App;