// 게시물 작성하는 로직
const writeFrm = document.querySelector('#writeFrm');

class Board {
    constructor(indexNum, subjectStr, writerStr, contentStr) {
        this.index = indexNum;
        this.Subject = subjectStr;
        this.Writer = writerStr;
        this.Content = contentStr;
        this.date = recordDate();
        this.views = 0;
    }

    set Subject(value) {
        if (value.length === 0) throw new Error("제목을 입력해주세요.");
        this.subject = value;
    }

    set Writer(value) {
        if (value.length === 0) throw new Error("작성자를 입력해주세요.");
        this.writer = value;
    }

    set Content(value) {
        if (value.length === 0) throw new Error("내용을 입력해주세요.");
        this.content = value;
    }

}

const recordDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    mm = (mm > 9 ? "" : 0) + mm;
    dd = (dd > 9 ? "" : 0) + dd;

    const arr = [yyyy, mm, dd];

    return arr.join('-');
};

const submitHandler = (e) => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const writer = e.target.writer.value;
    const content = e.target.content.value.trim(); // 수정: trim()을 사용하여 공백만 있는 경우 걸러냄

    try {
        // boards를 가져오기
        let boardsObj = JSON.parse(localStorage.getItem("boards"));

        // 객체를 추가하기
        let index = 0;
        if (boardsObj) {
            index = boardsObj.length > 0 ? boardsObj[boardsObj.length - 1].index + 1 : 0; // 수정: 마지막 게시물의 index + 1로 설정
        } else {
            boardsObj = [];
        }

        const instance = new Board(index, subject, writer, content);
        boardsObj.push(instance);

        // boards에 저장하기
        const boardsStr = JSON.stringify(boardsObj);
        localStorage.setItem("boards", boardsStr);
        location.href = "/board/view.html?index=" + index;
    } catch (e) {
        // 예외 발생 시 메시지를 출력하기
        alert(e.message);
        console.error(e);
    }
};

writeFrm.addEventListener("submit", submitHandler);