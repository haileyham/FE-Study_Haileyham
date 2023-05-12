/*

- AJAX : https://www.youtube.com/watch?v=nKD1atl6cAw 코딩애플
- AJAX 기초 + JSON : https://www.youtube.com/watch?v=FN_D4Ihs3LE 드림코딩
- API / JSON / AJAX / HTML 화면에 API로 받아온 정보 넣는 방법 / 날씨API / 백엔드 대체하는 API 활용하기(API 로 데이터 받기) : https://www.youtube.com/watch?v=pLBJgvC_ZUA 조코딩

유용한 API (많은 빅테크 기업들은 API를 오픈해서 제공하니 참고!)
https://github.com/public-apis/public-apis   public APIs
  - Auth(로그인 필요하다/Key받은사람만 가능)
  - HTTPS(보안 연결 제공 여부)/CORS(HTML 페이지 내 요청에 따른 오류 여부 
  - Yes - HTML에서 요청은 거부 따로 > Proxy Server거쳐야함)
https://github.com/robertduessmann/weather-api 날씨
  https://goweather.herokuapp.com/weather/{city} {city}에 도시이름
  request : curl https://localhost:3000/weather/Curitiba
https://docs.thecatapi.com/ 고양이사진
https://developers.naver.com/main/
https://developers.kakao.com/
https://console.developers.google.com/?hl=ko&refresh=1
https://www.data.go.kr/ 공공데이터포털
https://www.iamport.kr/ 결제
https://channel.io/ko /상담채널 실시간 톡

AJAX : Asynchronous JavaScript And XML / 서버와 비동기적으로 데이터 주고받는 자바스크립트 기술
- 서버에 GET, POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는 간단한 브라우저 기능을 AJAX라고 합니다. 그거 쓰면 새로고침 없이도 쇼핑몰 상품을 더 가져올 수도 있고 새로고침 없이도 댓글을 서버로 전송할 수도 있고 그런 기능을 만들 수 있는 것임 

ajax는 그냥 서버로 몰래 데이터요청하는 코드일 뿐
html에서 서버로 ajax 요청하는 방법은 3개
get 말고 post요청은 서버로 내 데이터를 실어보낼 수 있음.


AJAX 이해 사전지식 : 서버 - 유저가 데이터 요구하면 데이터 보내주는 프로그램
ex) 네이버 웹툰 서버 > 서버에서 웹툰 보내줌(데이터)
1. 원하는 데이터 URL(서버개발자가 만든 API : comic.naver.com으로 요청하면 웹툰줌)
2. 그 URL로 GET 요청 > 서버에서 보내줌

-GET 요청 보내는 법
1) 브라우저에 url입력 
  comic.naver.com
2) form태그에 버튼으로 GET 요청(전부 브라우저가 새로고침 됨)
  <form action="comic.naver.com" method="get">
  <button type="submit">(이거 누르면 GET 요청됨)
3) AJAX로 GET요청 : 새로고침 없이 서버에게 GET요청하는 JS코드

장점 : 새로고침이 없기 때문에 부드럽게 동작
 */


//옛날 JS 방식
let ajax = new XMLHttpRequest();
ajax.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    console.log(ajax.responseText)
  }
};
ajax.open("GET",'url',true);
ajax.send();


//요즘 방식
fetch("url")
  .then((response) => {
    return response.json();
  })
  .then((결과) => {
    console.log(결과);
  })
  .catch((error) => {
    console.log(error);
  });


//정확히 에러를 catch하고 싶을 때
fetch("url")
  .then((response) => {
    if (!response.ok) {
      throw new Error("400 아니면 500 에러남");
    }
    return response.json();
  })
  .then((결과) => {
    console.log(결과);
  })
  .catch(() => {
    console.log("에러남");
  });


//then 함수 쓰기 싫을 때
async function 데이터가져오는함수() {
  const response = await fetch("url");
  if (!response.ok) {
    throw new Error("400 아니면 500 에러남");
  }
  const result = await response.json();
  console.log(result);
}
데이터가져오는함수().catch(() => {
  console.log("에러남");
})

//외부 라이브러리 방식 
// jQuery $.ajax()
// axios 설치해서 많이 씀
axios.get('url')
  .then((result)=>{
    console.log(result.data)
  }).catch(()=>{
    console.log('에러남')
  })
  

  //CORS 관련 에러 자주 보게 됨 (daum.net > naver.com ajax요청불가능) : 보안관련
  //CORS 끄기
  // 헤더에 Access-Control-Allow-Origin:"*" 추가하거나
  // var cors = require('cors')
  // app.use(cors());