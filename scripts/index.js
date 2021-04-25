var gameObject = {
    properties: {
        pause: false,
        gameBoard: null,
        gameMatrix: null,
        matrixNextState: null,
        loop: null,
    },
    initGame: function(){
        let newCell;
        let cellsWidth = 5;
        let cellsHeight = 5;
        let totalCells = cellsWidth * cellsHeight;
        this.properties.gameBoard = document.getElementById("game-board");

        for(var i = 0; i < totalCells; i++){
            newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.classList.add("dead");
            newCell.setAttribute("id", "cell-" + i);
            newCell.onclick = this.setCellState;
            this.properties.gameBoard.appendChild(newCell);
        }

        this.properties.gameMatrix = new Array(cellsWidth);
        for (var i = 0; i < cellsWidth; i++){
            
            this.properties.gameMatrix[i] = new Array(cellsHeight);
            for(var j = 0; j < cellsHeight; j++){
                this.properties.gameMatrix[i][j] = 0;
            }
        }

        this.properties.matrixNextState = new Array(cellsWidth);
        for (var i = 0; i < cellsWidth; i++){
            
            this.properties.matrixNextState[i] = new Array(cellsHeight);
            for(var j = 0; j < cellsHeight; j++){
                this.properties.matrixNextState[i][j] = 0;
            }
        }
    },
    setAliveCells: function(){
        cells = [
            [1,2],
            [2,2],
            [3,2],
        ]

        for(var i = 0; i < cells.length; i++){
            this.properties.matrixNextState[cells[i][0]][cells[i][1]] = 1;
        }
    },
    manageCells: function(){

        //0- Check the pause.
        if(!this.gameObject.properties.pause){
            for(let i = 0; i < this.gameObject.properties.gameMatrix.length; i++){
                for(let j = 0; j < this.gameObject.properties.gameMatrix[i].length; j++){
    
                    let currentCellId = "cell-" + ((this.gameObject.properties.gameMatrix[i].length * i) + j);
                    let currentCell = document.getElementById(currentCellId);
    
                    //1- Paint current state of cells.
                    this.gameObject.properties.gameMatrix[i][j] = this.gameObject.properties.matrixNextState[i][j];
    
                    if(this.gameObject.properties.gameMatrix[i][j] === 1){
                        currentCell.classList.remove("dead");
                        currentCell.classList.add("alive");
                    }else if (this.gameObject.properties.gameMatrix[i][j] === 0){
                        currentCell.classList.remove("alive");
                        currentCell.classList.add("dead");
                    }
                }
            }
    
            for(let i = 0; i < this.gameObject.properties.gameMatrix.length; i++){
                for(let j = 0; j < this.gameObject.properties.gameMatrix[i].length; j++){
                    let numOfNeighbors = 0;
                    let arrayLength = this.gameObject.properties.gameMatrix.length;
    
                    //2- Get neighbors cells.
                    let currentNeighbors = [
                        this.gameObject.properties.gameMatrix[(i === 0 ? arrayLength : i)-1][(j === 0 ? arrayLength : j)-1],
                        this.gameObject.properties.gameMatrix[(i === 0 ? arrayLength : i)-1][j],
                        this.gameObject.properties.gameMatrix[(i === 0 ? arrayLength : i)-1][(j === arrayLength-1 ? 0 : j)+1],
                        this.gameObject.properties.gameMatrix[i][(j === 0 ? arrayLength : j)-1],
                        this.gameObject.properties.gameMatrix[i][(j === arrayLength-1 ? 0 : j)+1],
                        this.gameObject.properties.gameMatrix[(i === arrayLength-1 ? 0 : i)+1][(j === 0 ? arrayLength : j)-1],
                        this.gameObject.properties.gameMatrix[(i === arrayLength-1 ? 0 : i)+1][j],
                        this.gameObject.properties.gameMatrix[(i === arrayLength-1 ? 0 : i)+1][(j === arrayLength-1 ? 0 : j)+1],
                    ]
    
                    //3- Set next state for cells.
                    for(let k = 0; k < currentNeighbors.length; k++){
                        if(currentNeighbors[k] === 1)
                            numOfNeighbors++;
                    }
    
                    if(this.gameObject.properties.gameMatrix[i][j] === 1){
                        if(numOfNeighbors <= 1 || numOfNeighbors >= 4)
                            this.gameObject.properties.matrixNextState[i][j] = 0;
                        else if (numOfNeighbors === 2 || numOfNeighbors === 3)
                            this.gameObject.properties.matrixNextState[i][j] = 1;
                    }else if(this.gameObject.properties.gameMatrix[i][j] === 0){
                        if(numOfNeighbors === 3)
                            this.gameObject.properties.matrixNextState[i][j] = 1;
                    }
                }
            }   
        }
    },
    play: function(){
        setInterval(this.manageCells, 1000);
    },
    pause: function(){
        this.properties.pause = true;
    },
    start: function(){
        this.properties.pause = false;
    },
    setCellState: function(){
        if(gameObject.properties.pause){
            //Get the position by the Id.
            let i = 0, j = 0;
            let exit = false;
            let id = parseInt(this.attributes.id.value.slice(5));
            let currentCell = document.getElementById(this.attributes.id.value);

            do{

                if (id >= 5){
                    i++;
                    id -= 5; 
                }else{
                    j += id;
                    id -= id;
                }

                if(id === 0)
                    exit = true;

            }while(!exit);

            if(gameObject.properties.matrixNextState[i][j] === 0){
                gameObject.properties.matrixNextState[i][j] = 1;
                currentCell.classList.remove("dead");
                currentCell.classList.add("alive");
            }else{
                gameObject.properties.matrixNextState[i][j] = 0;
                currentCell.classList.remove("alive");
                currentCell.classList.add("dead");
            }

        }
    }
}