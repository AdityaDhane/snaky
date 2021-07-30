import React from 'react';
import Cell from './Cell'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.gridSize = {
            X: Math.floor(window.screen.availWidth/(2*props.cellSize)),
            Y: Math.floor(window.screen.availHeight/(2*props.cellSize)),
        };
        
        const grid = Array(this.gridSize.Y).fill().map(() => Array(this.gridSize.X).fill(0));
        for(let i=0; i<4; i++)
            grid[4][i] = 1;
        
        const food = this.getRandomCell(grid);
        grid[food[0]][food[1]] = -1;
        
        
        this.state = {
            grid: grid,
        };
        this.snake = {
            head: [4,3],
            tail: [4,0],
        };
            
        const sideX = this.gridSize.X * props.cellSize + 'px';
        const sideY = this.gridSize.Y * props.cellSize + 'px';
        this.style = {
            height: sideY,
            width: sideX,
        };
        
        this.updateGrid = this.updateGrid.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.getRandomCell = this.getRandomCell.bind(this);
    }

    changeDirection(key) {
        const dir = {
            'ArrowRight': 1,
            'ArrowDown': 2,
            'ArrowLeft': 3,
            'ArrowUp': 4,
        };
        if(key in dir && this.state.grid[this.snake.head[0]][this.snake.head[1]]%2 !== dir[key]%2)
        {
            const grid = this.state.grid.map((arr) => {
                return arr.slice();
            });
            grid[this.snake.head[0]][this.snake.head[1]] = dir[key];
            this.setState({
                grid: grid,
            });
            this.updateGrid();
        }
    }

    getRandomCell(grid) {
        let x,y;
        do {
            x = Math.floor(Math.random() * this.gridSize.X);
            y = Math.floor(Math.random() * this.gridSize.Y);
        } while(grid[y][x]);
        return [y, x];
    }
    
    updateGrid() {
        const grid = this.state.grid.map((arr) => {
            return arr.slice();
        });
        const snake = this.snake;

        const next = (point, dir) => {
            if(dir === 1)
                point[1]+=1;
            else if(dir === 2)
                point[0]+=1;
            else if(dir === 3)
                point[1]-=1;
            else 
                point[0]-=1;
            point[0] = (this.gridSize.Y + point[0]) % this.gridSize.Y;
            point[1] = (this.gridSize.X + point[1]) % this.gridSize.X;
            return point;
        }

        let dir = grid[snake.head[0]][snake.head[1]];
        next(snake.head, dir);

        if(grid[snake.head[0]][snake.head[1]] > 0)
        {
            document.removeEventListener('keydown', this.changeDirection);
            clearInterval(this.interval);    
            this.props.gameOver();
        }
        else
        {
            if(grid[snake.head[0]][snake.head[1]] === 0)
            {
                const dir = grid[snake.tail[0]][snake.tail[1]];
                grid[snake.tail[0]][snake.tail[1]] = 0;
                next(snake.tail,dir);
            }
            else
            {
                this.props.incScore();
                const food = this.getRandomCell(grid,this.gridSize);
                grid[food[0]][food[1]] = -1;
            }
            grid[snake.head[0]][snake.head[1]] = dir;
            
            this.snake = snake;
            this.setState({
                grid: grid,
            });
        }
    }
  
    componentDidMount() {
        this.interval = setInterval(this.updateGrid, 100);
        document.addEventListener('keydown', (event) => {
            this.changeDirection(event.key);
        });
    }

    render() {
        const grid = this.state.grid.slice();
        const cells = [];
        grid.forEach((row, i) => {
                row.forEach((cell, j) => {
                    cells.push((<Cell key={this.gridSize.X*i+j}
                                 color={cell} 
                                 cellSize={this.props.cellSize}/>));
            });
        });
    
        return (
            <div className="grid" style={this.style}>
                {cells}
            </div>
        )
    }
}

export default Grid;