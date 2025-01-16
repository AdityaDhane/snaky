import React, { useRef, useState, useEffect, useCallback } from 'react';
import Cell from './Cell';

const CELL_SIZE = 20;

const gridSize = {
    X: Math.floor(window.screen.availWidth / (2 * CELL_SIZE)),
    Y: Math.floor(window.screen.availHeight / (2 * CELL_SIZE)),
};

// generate food location
const getRandomCell = (grid) => {
    let x,y;
    do {
        x = Math.floor(Math.random() * gridSize.X);
        y = Math.floor(Math.random() * gridSize.Y);
    } while(grid[y][x]);
    return [y, x];
}

const next = (point, dir) => {
    if(dir === 1)
        point[1]+=1;
    else if(dir === 2)
        point[0]+=1;
    else if(dir === 3)
        point[1]-=1;
    else
        point[0]-=1;
    point[0] = (gridSize.Y + point[0]) % gridSize.Y;
    point[1] = (gridSize.X + point[1]) % gridSize.X;
    return point;
}


const initialGrid = Array(gridSize.Y).fill().map(() => Array(gridSize.X).fill(0));
for(let i=0; i<4; i++)
    initialGrid[4][i] = 1;

const food = getRandomCell(initialGrid);
initialGrid[food[0]][food[1]] = -1;

const initialSnake = {
    head: [4,3],
    tail: [4,0],
};

function Grid(props) {
    const interval = useRef(null);
    const [gridState, setGridState] = useState({
        grid: initialGrid,
        snake: initialSnake,
    });

    // move snake forward
    const updateGrid = useCallback(() => {
        setGridState((gridState) => {
            const gridNew = JSON.parse(JSON.stringify(gridState.grid));
            const snakeNew = JSON.parse(JSON.stringify(gridState.snake));

            let dir = gridNew[snakeNew.head[0]][snakeNew.head[1]];
            next(snakeNew.head, dir);

            // Gameover
            if (gridNew[snakeNew.head[0]][snakeNew.head[1]] > 0) {
                clearInterval(interval.current);
                props.gameOver();
                return gridState;
            } else {
                // no food caught
                if(gridNew[snakeNew.head[0]][snakeNew.head[1]] === 0)
                {
                    const dir = gridNew[snakeNew.tail[0]][snakeNew.tail[1]];
                    gridNew[snakeNew.tail[0]][snakeNew.tail[1]] = 0;
                    next(snakeNew.tail, dir);
                }
                // food caught
                else
                {
                    props.incScore();
                    const food = getRandomCell(gridNew, gridSize);
                    gridNew[food[0]][food[1]] = -1;
                }
                gridNew[snakeNew.head[0]][snakeNew.head[1]] = dir;

                return {
                    grid: gridNew,
                    snake: snakeNew,
                };
            }
        })
    }, [props.gameOver, props.incScore]);

    // reset game
    const resetGrid = useCallback(() => {
        setGridState({
            grid: initialGrid,
            snake: initialSnake,
        });

        props.resetGame();
        interval.current = setInterval(updateGrid, 100);
    }, [props.resetGame, updateGrid]);

    // Event handler for keyboard key press
    const keyHandler = useCallback((event) => {
        let key = event.key

        if (!props.gameOn) {
            if (key === ' ')
                resetGrid();
            else
                return;
        }

        const dir = {
            'ArrowRight': 1,
            'ArrowDown': 2,
            'ArrowLeft': 3,
            'ArrowUp': 4,
        };

        setGridState((gridState) => {
            if (
                key in dir
                && gridState.grid[gridState.snake.head[0]][gridState.snake.head[1]]%2 !== dir[key]%2
            ) {
                const gridNew = JSON.parse(JSON.stringify(gridState.grid));
                gridNew[gridState.snake.head[0]][gridState.snake.head[1]] = dir[key];
                updateGrid();
                return {
                    grid: gridNew,
                    snake: gridState.snake,
                };
            }
            return gridState
        })
    }, [props.gameOn, resetGrid, updateGrid]);

    useEffect(() => {
        interval.current = setInterval(updateGrid, 100);
        document.addEventListener('keydown', keyHandler);

        return () => {
            clearInterval(interval.current);
            document.removeEventListener('keydown', keyHandler);
        }
    }, [updateGrid, keyHandler]);


    return (
        <div className="grid" style={{
            height: gridSize.Y * CELL_SIZE+ 'px',
            width: gridSize.X * CELL_SIZE + 'px',
        }}>
            {gridState.grid.map((row, i) => (
                row.map((cell, j) => (
                    <Cell
                        key={gridSize.X*i+j}
                        color={cell}
                        cellSize={CELL_SIZE}
                    />
                ))
            ))}
        </div>
    );
}

export default Grid;