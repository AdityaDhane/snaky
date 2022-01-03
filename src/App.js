import React from 'react';
import './App.css';
import Grid from './components/Grid';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameOn: true,
			score: 0,
			highScore: 0,
		};

		this.gameOver = this.gameOver.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.incScore = this.incScore.bind(this);
	}

	gameOver() {
		this.setState({
			gameOn: false,
		})
	}

	resetGame() {
		this.setState((state) => ({
			gameOn: true,
			score: 0,
		}))
	}

	incScore() {
		this.setState((state) => ({
			score: state.score + 1,
			highScore: Math.max(state.highScore, state.score+1),
		}))
	}

	render() {
		return (
			<div className="App">
				<h1 id='header'>🐍 Snaky 🐍</h1>
				<Grid cellSize={20}
					gameOn={this.state.gameOn}
					gameOver={this.gameOver}
					resetGame={this.resetGame}
					incScore={this.incScore} />
				{!this.state.gameOn && 
					<h2>press Space to restart</h2>}
				<div className='scoreboard'>
					<h1>HighScore: {this.state.highScore}</h1>
					<h1>Score: {this.state.score}</h1>
				</div>
			</div>
		)
	}
}

export default App;