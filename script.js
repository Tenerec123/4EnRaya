const TurnH1 = document.getElementById('Turn')
const ResetBtn = document.getElementById('Restart')
let GameBoard

let RedWins = 0
let YellowWins = 0

let Width = 7
let Height = 6

let RedTurn = false
let LastTurn = RedTurn

let InGame
CreateBoard()

function CreateBoard(){
    RedTurn = !LastTurn
    LastTurn = RedTurn

    TurnH1.textContent = RedTurn ? 'Turno de ROJO': 'Turno de AMARILLO'
    TurnH1.style.color = RedTurn ? 'red': 'yellow'

    GameBoard = document.createElement('div')
    GameBoard.id = 'GameBoard'
    document.body.insertBefore(GameBoard, ResetBtn)
    for (let x = 0; x < Width; x++){
        const newCol = document.createElement('div')
        newCol.classList.add('Column')
        newCol.id = `col${x}`
        newCol.onclick =() => SelectCol(x)
        GameBoard.prepend(newCol)

        for (let y=0; y < Height; y++){
            const newBlock = document.createElement('div')
            newBlock.classList.add('block')
            newBlock.id = `block${x},${y}`
            document.getElementById(`col${x}`).prepend(newBlock)
        }
    }
    InGame = true
}
let TotTab = 0
function SelectCol(x){
    if (InGame){
        let AllCol = document.querySelectorAll(`#col${x} .block`)
        for(let y=AllCol.length-1;y>=0;y--){
            console.log(AllCol[y])
            if (!AllCol[y].classList.contains('hasTab')){
                
                ColorClass = RedTurn ? 'red':'blue'
                
                const tab =document.createElement('div')
                tab.classList.add('tab', ColorClass)
                AllCol[y].classList.add('hasTab', `-${ColorClass}-`)
                document.getElementById(`block${x},${AllCol.length-y-1}`).prepend(tab)

                TotTab++
                if (DetectVictory(x, AllCol.length-y-1, ColorClass)){ 
                    InGame = false
                    TurnH1.textContent = RedTurn ? 'Ha ganado ROJO':'Ha ganado AMARILLO'
                    ResetBtn.style.display = 'block'

                    if (RedTurn){
                        RedWins++
                        document.getElementById('RedSc').textContent = RedWins
                    }
                    else{
                        YellowWins++
                        document.getElementById('YellowSc').textContent = YellowWins
                    }
                    break
                }    

                RedTurn = !RedTurn

                TurnH1.textContent = RedTurn ? 'Turno de ROJO': 'Turno de AMARILLO'

                TurnH1.style.color = RedTurn ? 'red': 'yellow'
                break
            }
        }
    }
}

VeryBigIf = (Ox,x, Oy, y, ColorClass) =>{

    if (Ox + 3*x > Width || Ox + 3*x < 0 || Oy + 3*y > Height || Oy + 3*y < 0){
        return false
    }
    if (y==0 && x==0){
        return false
    }
    if (!document.getElementById(`block${Ox+x},${Oy+y}`).classList.contains(`-${ColorClass}-`)){
        return false
    }
    if (!document.getElementById(`block${Ox+2*x},${Oy+2*y}`).classList.contains(`-${ColorClass}-`)){
        return false
    }
    if (!document.getElementById(`block${Ox+3*x},${Oy+3*y}`).classList.contains(`-${ColorClass}-`)){
        return false
    }
    console.log(Ox, x, Oy, y)
    return true
}

function DetectVictory(Ox, Oy, ColorClass){
    for (let x = -1; x <= 1; x++){
        for (let y = -1; y <=1; y++){
            if (VeryBigIf(Ox,x, Oy,y, ColorClass)){
                return true
            }
        }
    }
    return false
}

function RestartGame(){

    document.body.removeChild(GameBoard)
    CreateBoard()
    ResetBtn.style.display = 'none'
}

function ResGame(){
    LastTurn = !LastTurn
    RestartGame()
}

function ResScore(){
    RedWins = 0
    YellowWins = 0
    document.getElementById('RedSc').textContent = RedWins
    document.getElementById('YellowSc').textContent = YellowWins
    RestartGame()
    RedTurn = false
}
