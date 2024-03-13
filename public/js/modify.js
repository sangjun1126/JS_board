const modifyFrm = document.querySelector("#modifyFrm");
const modifyFrmList = document.querySelectorAll("#modifyFrm > div");
const idx = location.search;
const index = location.search.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

for (let i = 0; i < modifyFrmList.length; i++) {
    const element = modifyFrmList[i].childNodes[1];
    const id = element.name;
    element.value = board[id];
}

const isEmpty = (subject, writer, content) => {
    if (subject.length === 0) throw new Error("제목을 입력해주세요.");
    if (writer.length === 0) throw new Error("작성자를 입력해주세요.");
    if (content.length === 0) throw new Error("내용을 입력해주세요.");
};

const modifyHandler = (e) => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const writer = e.target.writer.value;
    const content = e.target.content.value;

    try {
        isEmpty(subject, writer, content);
        board.subject = subject;
        board.writer = writer;
        board.content = content;

        const boardsStr = JSON.stringify(boardsObj);
        localStorage.setItem("boards", boardsStr);
        location.href = "/board/view.html" + idx;
    } catch (e) {
        alert(e.message);
        console.error(e);
    }
};

const backBtn = document.querySelector('#back');

const backBtnHandler = (e) => {
    location.href = document.referrer;
};

modifyFrm.addEventListener("submit", modifyHandler);
backBtn.addEventListener("click", backBtnHandler);