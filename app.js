let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");

let result=document.querySelector("#result");
let playGameAgain=document.querySelector("#playGame");
let turnO = true; //player x, player O
let count=0;

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box, value) => {
  box.addEventListener("click", () => {
    count+=1;
    console.log(count);
    box.innerText = value;
    if (turnO) {
      box.innerText = "O";

      turnO = false;
      box.style.backgroundColor = "lightgreen";
      box.style.color = "black";
      box.style.textShadow="2px 2px 2px white";

    } else {
      box.innerText = "X";
      turnO = true;
      box.style.backgroundColor = "yellow";
      box.style.color = "red";
      box.style.textShadow="2px 2px 2px black";
    }
    box.disabled = true;
    checkWinner();
    if(count===9){
        draw();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  turnO = true;
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "white";
  }
};

resetBtn.addEventListener("click", enableBoxes);
playGameAgain.addEventListener("click",()=>{
    enableBoxes();
    closeModal();
});

const checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos0Val = boxes[pattern[0]].innerText;
    let pos1Val = boxes[pattern[1]].innerText;
    let pos2Val = boxes[pattern[2]].innerText;

    if (pos0Val != "" && pos1Val != "" && pos2Val != "") {
      if (pos0Val === pos1Val && pos1Val === pos2Val) {
        console.log("winner", pos0Val);
        disableBoxes();
        count=0;
        openModal(pos0Val);
      }
    }
  }
};
const modal = document.getElementById("myModal");

function openModal(printValue) {
    result.innerText=`Congratulation! Winner is ${printValue}.`;
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}

const draw=()=>{
    result.innerText=`Draw! Play Again. `;
  modal.style.display = "flex";
}