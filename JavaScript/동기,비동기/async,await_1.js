// async / await





//(1) 콜백함수
function 더하기(콜백) {
  1 + 1;
  콜백();
}

더하기(함수);


//---------------------------------------

//(2) Promise
var 프로미스 = new Promise((resolve, reject) => {
  function 더하기() {
    1 + 1;
  }
})

더하기().then(function () {

});


//---------------------------------------

//(3) async
// 함수 선언 앞에 사용 
// async를 function 앞에 붙이면 함수가 Promise 역할 가능. 함수 실행 후에 Promise 오브젝트가 남음.

// 단점 : 성공만 가능


// 성공 햇을 때의 실행
async function 더하기() {
  1 + 1;
}

더하기().then(function () {
  console.log('성공이에요')
});


// return 연산결과 출력
async function 더하기() {
  return 1 + 1;
}

더하기().then(function (결과) {
  console.log(결과)
});


// 강제로 실패 
async function 더하기() {
  return Promise.reject('실패임')
}

더하기().then(function (결과) {
  console.log(결과)
});



//---------------------------------------

//(4) async function 안에서 쓰는 await

// 함수 안에서 Promise 쓰기

async function 더하기() {
  var 프로미스 = new Promise(function (성공, 실패) {
    var 힘든연산 = 1 + 1;
    성공();
  });

  프로미스.then(function () {
    console.log('성공했어요')
  });
}
더하기();


// 위 아래 같은 코드
// async function 안에서 쓰는 await : then 대신 사용 가능
async function 더하기() {
  var 프로미스 = new Promise(function (성공, 실패) {
    var 힘든연산 = 1 + 1;
    성공();
  });

  var 결과 = await 프로미스; // await 프로미스 해결까지 기다림.
  console.log(결과);
}
더하기();


// 함수가 아니면 그냥 함수로 묶어줘서 사용하면 됨!_!


//---------------------------------------

// (5) try{} catch{}
// try{ 이걸해보고 에러나면 } catch{ 이거 실행해주세요 }

async function 더하기() {
  var 프로미스 = new Promise(function (성공, 실패) {
    var 힘든연산 = 1 + 1;
    실패(100);
  });

  var 결과 = await 프로미스; //실패했을 경우 error 뜸
  console.log(결과);
}
더하기();


// await은 프로미스 실패시 error나고 멈춤. 이를 방지하기 위해서
// try{ 이걸해보고 에러나면 } catch{ 이거 실행해주세요 }

async function 더하기() {
  var 프로미스 = new Promise(function (성공, 실패) {
    var 힘든연산 = 1 + 1;
    // 성공(100); //100 출력
    실패(100); //'프로미스 연산이 잘 안됐구낭' 출력
  });

  try {
    var 결과 = await 프로미스; //실패했을 경우 error 뜸
    console.log(결과);
  } catch {
    console.log('프로미스 연산이 잘 안됐구낭')
  }
}
더하기();

// 프로미스 연산결과는 변수에 저장 가능