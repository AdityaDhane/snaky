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
		this.incScore = this.incScore.bind(this);
	}

	gameOver() {
		this.setState({
			gameOn: false,
		})
	}

	incScore() {
		this.setState({
			score: this.state.score+1,
			highScore: Math.max(this.state.highScore, this.state.score + 1),
		})
	}

	render() {
		return (
			<div className="App">
				<h1>🐍 Snaky 🐍</h1>
				<Grid cellSize={20} gameOver={this.gameOver} incScore={this.incScore} />
				<div className='scoreboard'>
					<h1>HighScore: {this.state.highScore}</h1>
					<h1>Score: {this.state.score}</h1>
				</div>
				{!this.state.gameOn && 
					<h1>Game Over</h1>}
			</div>
		)
	}
}

export default App;
