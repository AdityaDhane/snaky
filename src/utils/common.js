export const snakeNextPosition = (point, dir, gridSize) => {
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

// generate food location
export const getRandomCell = (grid, gridSize) => {
    let x,y;
    do {
        x = Math.floor(Math.random() * gridSize.X);
        y = Math.floor(Math.random() * gridSize.Y);
    } while(grid[y][x]);
    return [y, x];
}
