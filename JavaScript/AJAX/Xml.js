
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






