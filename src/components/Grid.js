import React from 'react';
import Cell from './Cell'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        const grid = Array(props.blocks).fill().map(() => Array(props.blocks).fill(0));
        for(let i=0; i<3; i++)
            grid[4][i] = 1;

        this.state = {
            grid: grid,
        };
        this.snake = {
            head: [4,2],
            tail: [4,0],
            size: 3,
        };

        const side = props.blocks*50 + 'px';
        this.style = {
            height: side,
            width: side,
        };
    }  
  
    updateGrid() {
        const grid = this.state.grid.map((arr) => {
            return arr.slice();
        });
        const mod = this.props.blocks;
        const snake = this.snake;

        const next = (point, dir) => {
            if(dir == 1)
                point[1]+=1;
            else if(dir == 2)
                point[0]-=1;
            else if(dir == 3)
                point[1]-=1;
            else 
                point[0]+=1;
            point[0] = (mod + point[0])%mod;
            point[1] = (mod + point[1])%mod;
            return point;
        }

        let dir = grid[snake.head[0]][snake.head[1]];
        next(snake.head,dir);
        grid[snake.head[0]][snake.head[1]] = dir;

        dir = grid[snake.tail[0]][snake.tail[1]];
        grid[snake.tail[0]][snake.tail[1]] = 0;
        next(snake.tail,dir);

        this.snake = snake;
        this.setState({
            grid: grid,
        })
    }
  
    componentDidMount() {
        this.interval = setInterval(() =>this.updateGrid(),500);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }
  
    render() {

        const grid = this.state.grid.slice();
        const cells = [];
        grid.forEach((row, i) => {
                row.forEach((cell, j) => {
                cells.push((<Cell key={10*(i-1)+j} fill={cell} />));
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