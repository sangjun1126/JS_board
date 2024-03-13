const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

const idx = location.search;
const index = idx.split("=")[1];
const board = boardsObj[index];

const beforeUrl = document.referrer;

const viewCount = (beforeUrl) => {
    if (beforeUrl.split("/").pop() === "list.html") {
        board.views++;
        const viewCountStr = JSON.stringify(boardsObj);
        localStorage.setItem("boards", viewCountStr);
    }
};

viewCount(beforeUrl);

const viewFrm = document.querySelectorAll("#viewFrm > div");

for (let i = 0; i < viewFrm.length; i++) {
    const id = viewFrm[i].id;
    viewFrm[i].innerHTML += " " + board[id];
}

const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
    location = "/board/modify.html" + idx;
}

modifyBtn.addEventListener("click", modifyBtnHandler);