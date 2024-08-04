let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

//playerX and playerO
let turnO = true;
let btnClick = 0;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    btnClick = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if(turnO){
            box.innerText = "O"
            turnO = false;
        } else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;
        btnClick++;

        let isWinnner = checkWinner();
        
        if(btnClick === 9 && !isWinnner) {
            gameDraw();
        }
    })
})

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const gameDraw = () => {
        msg.innerText = "Game was a Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

const checkWinner = () => {
    for(let pattern of winPattern) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if(pos1Value != "" && pos2Value != "" && pos3Value != "") {
        if(pos1Value === pos2Value && pos2Value === pos3Value) {
            
            showWinner(pos1Value);
        }
    } 
    }
    
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);