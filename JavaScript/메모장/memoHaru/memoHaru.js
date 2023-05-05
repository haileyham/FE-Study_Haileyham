let allMemo = JSON.parse(localStorage.getItem("allMemo"));
// allMemo 에 JSON.parse를 이용해 로컬스토리지 에 등록되어있는 allMemo(키) 로부터 데이터를 읽어 온 것을 JS 객체로 반환하여 저장
// 아무 것도 안한상태에는 null로 되어있음 그래서 아래 코드 실행 
allMemo = allMemo ?? [];
// allMemo가 null이나 undefined라면 빈배열 생성
render();

function saveNote(e) {
  // 메모 버튼 클릭 시 실행되는 함수
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;



  //입력값 '' 방지 추가
  //render()보다 위에있어야함
  if(title == ''){
    alert('오늘의 제목은 무엇인가요? 제목을 입력해 주세요')
    e.preventDefault(); //alert보다 위에오면 잘 작동 안하뮤 / 없으면 alert만 뜨고 render() 그대로 됨
  }if(content == ''){
    alert('당신의 하루가 궁금해요')
    e.preventDefault();
  }


  allMemo.push({ title, content, len: allMemo.length });
  // allMemo에 title, content, len: allMemo.length 각각의 프로퍼티로 푸시(저장)함
  console.log(allMemo)

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  // 로컬스토리지에 "allMemo"라는 키와 allMemo 안에 저장된 객체를 JSON.stringify로 문자열로 저장해줌.
  // 로컬스토리지는 문자열로 저장되어야 하기 때문.
  render();
}

function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";
  // 초기화해줌 id가 display인 태그를

  // // 최신 게시물이 위로 올라오도록
  // for (let i = allMemo.length; i > 0 ; i--) {
  //     // 아래와 유사 코드
  // }

  // for of 및 for in은 배열이 빈 배열이라도 에러없이 실행함.
  for (const item of allMemo) {
    const card = document.createElement("div"); // div만들기
    card.className = "card"; // div 만들꺼니까
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    saveContent.className = "cardP";
    // const saveId = document.createElement("p");
    const deleteMemoBtn = document.createElement("button");


    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    // saveId.textContent = item.len + 1;
    deleteMemoBtn.textContent = "x";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");

    // card.appendChild(saveId);
    card.appendChild(deleteMemoBtn);
    card.appendChild(saveTitle);
    card.appendChild(saveContent);
    display.appendChild(card);//display에 card도 넣어야하니까! 이걸 놓쳤네ㅠ
  }
}

function remove() {
  // console.log(event.srcElement.id);
  // console.log(allMemo);
  const idx = allMemo.find(
    (item) => item.len == event.srcElement.id
  );
  // event.srcElement.id는 이벤트가 발생한 요소의 ID 값을 나타낸다.

  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
      // findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환
    );
    // 결론 : idx가 true일 경우 allMemo 배열 안에서
    // item.len == idx.len을 만족하는(결과만 보자면 내가 누른 이벤트와 그 이벤트가 발생한 위치의 len이 같을 경우) 첫번 째 요소에 대한 인덱스를 반환하고 그 길이만큼 잘라서 반환 
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  // 위의 실행한 요소를 다시 저장하기 위해
  // 로컬스토리지에 "allMemo"라는 키와 allMemo 안에 저장된 객체를 JSON.stringify로 문자열로 저장해줌.
  render();
  // 렌더()를 통해 초기화해줌
}

const del = document.querySelector('#delAll');
del.addEventListener('click', function () {
  allMemo.splice(0);
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
})

// const date = document.querySelector('#date');
// const today = new Date();
// date.textContent = today.toISOString().slice(0, 10);

const time = new Date();
const year = time.getFullYear();
const month = String(time.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해줍니다. // padStart : 2자리글자 안되면 앞을 0으로 채워주기
const day = String(time.getDate()).padStart(2, "0");
date.textContent = `${year}년 ${month}월 ${day}일`;


let badgeCount = 0;
document.querySelector('#badge').addEventListener('click', function () {
  badgeCount += 1;
  if (badgeCount % 2 == 1) {
    document.querySelector('#badge').innerHTML = 'Light Mode ⇔';
    document.querySelector('body').classList.add('dark');
    document.querySelector('.header').classList.add('darkHeader');
    // document.querySelectorAll('.card').classList.add('cardDark');
    //card하면 첫번째만 적용됨 ㅠ
    document.querySelector('button').classList.add('darkBtn');
    // document.querySelector('.memoBtn').classList.add('memoBtnDark');
    // document.querySelector('#title').classList.add('.titleDark');
    // document.querySelector('#date').classList.add('.dateDark');
    // id값때문에 JS class로 바꿔야함
    // document.querySelectorAll('.card > .cardP').classList.add('cardPDark');
  } else {
    document.querySelector('#badge').innerHTML = 'Dark Mode ⇔';
    document.querySelector('body').classList.remove('dark');
    document.querySelector('.header').classList.remove('darkHeader');
    document.querySelector('button').classList.remove('darkBtn');
    document.querySelector('.memoBtn').classList.remove('memoBtnDark');

  }
})
