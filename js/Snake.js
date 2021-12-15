const ROWS = 10
const COLUMNS = 10
const START_COOLDOWN = 400
const LEVEL_COOLDOWN = 20

const CELL_SIZE = 50
const CELL_MARGIN = 3
const GAME_PADDING = 10

const FOOD_COLOR = '#8db600'
const BAD_FOOD_COLOR = '#981815'
const SNAKE_COLOR = '#264e36'
const FREE_COLOR = 'rgb(240, 240, 240)'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = CELL_SIZE * COLUMNS + (COLUMNS - 1) * CELL_MARGIN + 2 * GAME_PADDING
canvas.height = CELL_SIZE * ROWS + (ROWS - 1) * CELL_MARGIN + 2 * GAME_PADDING

let map = createGameMap(COLUMNS, ROWS)

getRandomFreeCell(map).food = true
getRandomFreeCell(map).badFood = true

const cell = getRandomFreeCell(map)
let snake = [cell]

cell.snake = true

let snakeDirect = 'up'
let nextSnakeDirect = 'up'

requestAnimationFrame(loop)

let prevTick = 0
let play = true
let newgame = true
let cooldown = START_COOLDOWN

function start()
{
	context.beginPath()
	context.rect(0, 0, canvas.width, canvas.height)
	context.fillStyle = 'rgba(150, 150, 150)'
	context.fill()
	context.fillStyle = 'black'
	context.textAlign = "center"
	context.font = "30px sans-serif"
	context.fillText("Нажмите Enter чтобы начать игру", canvas.width / 2, canvas.height / 2)
}


function loop (timestamp) 
{
	requestAnimationFrame(loop)

	if (newgame)
	{
		start()
	}
	else
	{
		clearCanvas()

		if (prevTick + cooldown <= timestamp && play) 
		{
			prevTick = timestamp

			snakeDirect = nextSnakeDirect
			moveSnake()

			const head = snake[0]
			const tail = snake[snake.length - 1]

			if (head.food) 
			{
				head.food = false

				snake.push(tail)

				getRandomFreeCell(map).food = true
				cooldown -= LEVEL_COOLDOWN
			}
			else 
			{
				let isEnd = false

				if (head.badFood) 
				{
					head.badFood = false

					snake.pop()

					if (snake.length !== 0) 
					{
						getRandomFreeCell(map).badFood = true
					}
					else 
					{
						isEnd = true
					}
				}

				for (let i = 1; i < snake.length; i++) 
				{
					if (snake[i] === snake[0]) 
					{
						isEnd = true
						break
					}
				}

				if (isEnd) 
				{
					ajax()
					play = false
				}
			}
		}

		drawGameMap(map)
		showState()

		if (!play) 
		{
			drawPaused()
		}
	}
}

document.addEventListener("keydown", function (event) 
{
	if (event.key === "ArrowUp") 
    {
		if (snake.length === 1 || snakeDirect === "left" || snakeDirect === "right")
        {
			nextSnakeDirect = "up"
		}
	}

	else if (event.key === "ArrowDown") 
    {
		if (snake.length === 1 || snakeDirect === "left" || snakeDirect === "right") 
        {
			nextSnakeDirect = "down"
		}
	}

	else if (event.key === "ArrowLeft") 
    {
		if (snake.length === 1 || snakeDirect === "up" || snakeDirect === "down") 
        {
			nextSnakeDirect = "left"
		}
	}

	else if (event.key === "ArrowRight") 
    {
		if (snake.length === 1 || snakeDirect === "up" || snakeDirect === "down") 
        {
			nextSnakeDirect = "right"
		}
	}

	else if (event.key === 'Enter') 
    {
		newgame = false
		
		if (play) 
        {
			return
		}

		init()
	}
})

function drawRect (param) 
{
	context.beginPath()
	context.rect(param.x, param.y, param.width, param.height)
	context.fillStyle = param.fillColor
	context.fill()
}

function clearCanvas () 
{
	context.clearRect(0, 0, canvas.width, canvas.height)
}

function createGameMap (columns, rows) 
{
	const map = []

	for (let x = 0; x < columns; x++) 
	{
		const row = []

		for (let y = 0; y < rows; y++) 
		{
			row.push(
				{
				x: x,
				y: y,
				snake: false,
				food: false,
				badFood: false
			})
		}

		map.push(row)
	}

	return map
}

function getRandomFreeCell (map) 
{
	const freeCells = []

	for (const cell of map.flat()) 
	{
		if (cell.snake || cell.food) 
		{
			continue
		}

		freeCells.push(cell)
	}

	const index = Math.floor(Math.random() * freeCells.length)
	return freeCells[index]
}

function drawGameMap (map) 
{
	for (const cell of map.flat()) 
	{
		const param = 
		{
			x: GAME_PADDING + cell.x * (CELL_SIZE + CELL_MARGIN),
			y: GAME_PADDING + cell.y * (CELL_SIZE + CELL_MARGIN),
			width: CELL_SIZE,
			height: CELL_SIZE,
			fillColor: FREE_COLOR
		}

		if (cell.food) 
		{
			param.fillColor = FOOD_COLOR
		}

		if (cell.badFood)
		{
			param.fillColor = BAD_FOOD_COLOR
		}

		if (cell.snake) 
		{
			param.fillColor = SNAKE_COLOR
		}

		drawRect(param)
	}
}

function getCell (x, y) 
{
	if (x < 0) 
	{
		x += COLUMNS
	}

	if (x >= COLUMNS) 
	{
		x -= COLUMNS
	}

	if (y < 0) 
	{
		y += ROWS
	}

	if (y >= ROWS) 
	{
		y -= ROWS
	}

	for (const cell of map.flat()) 
	{
		if (cell.x === x && cell.y === y) 
		{
			return cell
		}
	}
}

function moveSnake () 
{
	for (let i = snake.length - 1; i > 0; i--) 
	{
		snake[i] = snake[i - 1]
	}

	if (snakeDirect === 'left') 
	{
		snake[0] = getCell(snake[0].x - 1, snake[0].y)
	}

	else if (snakeDirect === 'right') 
	{
		snake[0] = getCell(snake[0].x + 1, snake[0].y)
	}

	else if (snakeDirect === 'up') 
	{
		snake[0] = getCell(snake[0].x, snake[0].y - 1)
	}

	else if (snakeDirect === 'down') 
	{
		snake[0] = getCell(snake[0].x, snake[0].y + 1)
	}

	for (const cell of map.flat()) 
	{
		cell.snake = false
	}

	for (const cell of snake) 
	{
		cell.snake = true
	}
}

function showState () 
{
	document.getElementById("result").innerHTML = snake.length * 5;
}

function drawPaused () 
{
	context.beginPath()
	context.rect(0, 0, canvas.width, canvas.height)
	context.fillStyle = 'rgba(255, 255, 255, 0.7)'
	context.fill()

	context.font = "50px sans-serif"
	context.fillStyle = 'black'
	context.textAlign = "center"
	context.fillText(`Ваш счет: ${snake.length * 5}`, canvas.width / 2, canvas.height / 2)
	context.font = "30px sans-serif"
	context.fillText("Нажмите Enter чтобы продолжить", canvas.width / 2, canvas.height / 2 + 50)
}

function ajax()
{
	var result = snake.length * 5;
	$.ajax({ 
		url: 'inc/result.php',         
		method: 'get',             
		dataType: 'html',         
		data: {result: result} 
	});
}

function init () 
{
	map = createGameMap(COLUMNS, ROWS)

	const cell = getRandomFreeCell(map)

	snake = [cell]

	cell.snake = true

	snakeDirect = 'up'
	nextSnakeDirect = 'up'
	play = true
	cooldown = START_COOLDOWN

	getRandomFreeCell(map).food = true
	getRandomFreeCell(map).badFood = true
}