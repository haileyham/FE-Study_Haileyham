
const orderCoffee = new Promise((resolve, reject) => {

  const requestObj = new XMLHttpRequest();
  requestObj.open('GET', 'orderCoffee.txt');
  requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4 && requestObj.status === 200) {
          const result = requestObj.responseText;
          resolve(result);
      }
  };
  requestObj.send();
});

orderCoffee.then((asyncResult) => {
  console.log(asyncResult);
  console.log('약속이 이루어졌습니다.');
  return asyncResult; 
}).catch((error) => { 
  console.log(new Error('커피주문이 정상적으로 이뤄지지 않았습니다.'));
})




// XHR 객체를 생성합니다.
const requestObj = new XMLHttpRequest();
requestObj.open('GET', 'url'); // 요청을 초기화합니다. 통신방법과 요청을 발신할 대상의 주소를 전달합니다.
requestObj.onreadystatechange = () => { // readystate 가 변화하면 실행되는 이벤트리스너 입니다.
		// readystate : 요청을 보내는 클라이언트의 상태를 의미합니다.
    // readystate의 종류
    // 0 (UNSENT) - XHR 객체가 생성되었지만 아직 초기화되지 않았습니다.
    // 1 (OPENED) - open()함수가 호출되어 요청이 초기화되었습니다.
    // 2 (HEADERS_RECEIVED) - send()함수가 호출되었습니다.
    // 3 (LOADING) - 데이터를 다운받는 중 입니다.
    // 4 (DONE) - 통신이 완료되었습니다.
    if (requestObj.readyState == 4 && requestObj.status == "200") {
//requestObj.status
// readyState가 서버와의 통신상태를 나타낸다면, status는 서버의 응답상태를 나타냅니다.
// 200은 요청한 내용이 성공적으로 완료되었음을 의미합니다.
        const result = requestObj.responseText;

    }
};
requestObj.send(); // 서버로 요청을 보냅니다. send 메소드가 실행되어야만 우리가 위에서 설정한 내용들이 의미를 가지게 됩니다.



/*<aside>
🧐 **readyState와 status**

개발자들은 종종 readyState와 status를 혼동합니다. 간단한 비유로 설명해보겠습니다.

배가 너무 고파서 1시간 후에 집에서 저녁을 먹기 위해 피자를 주문해야 합니다. 그래서 배달앱을 꺼내 피자를 한판 주문합니다.

이때 배달하는 사람이 피자 배달을 완료했는지, 아니면 배달 중인지 추적합니다. (readyState)

피자가 집에 도착하고 피자가 올바르게 만들어졌는지 확인합니다. 피자가 타지 않았는지, 재료를 잘못 넣었는지, 또는 주문대로 내가 원하는 피자가 맞는지 확인합니다. (status)

결론적으로, readyState === 4 (즉, 피자가 집에 도착했음)이고 status === 200 (즉, 피자가 올바르게 만들어졌음)인 경우에만 모든 통신이 계획대로 잘 진행되었다는 것을 의미

</aside>*/

