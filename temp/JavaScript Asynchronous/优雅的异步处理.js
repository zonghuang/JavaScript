/**
 * 视频聊天应用程序
 */
/*
function handleCallButton(evt) {
  setStatusMessage("Calling...");
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((chatStream) => {
      selfViewElem.srcObject = chatStream;
      chatStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, chatStream));
      setStatusMessage("Connected");
    })
    .catch((err) => {
      setStatusMessage("Failed to connect");
    });
}
*/

// callback 回调地狱
chooseToppings(function (toppings) {
  placeOrder(
    toppings,
    function (order) {
      collectOrder(
        order,
        function (pizza) {
          eatPizza(pizza);
        },
        failureCallback
      );
    },
    failureCallback
  );
}, failureCallback);

// 使用异步 promise 改良
chooseToppings()
  .then(function (toppings) {
    return placeOrder(toppings);
  })
  .then(function (order) {
    return collectOrder(order);
  })
  .then(function (pizza) {
    eatPizza(pizza);
  })
  .catch(failureCallback);

// 使用箭头函数，进一步简化代码
// 箭头函数 () => x 是 ()=> {return x;}  的有效简写
chooseToppings()
  .then((toppings) => placeOrder(toppings))
  .then((order) => collectOrder(order))
  .then((pizza) => eatPizza(pizza))
  .catch(failureCallback);

// 你甚至可以这样做，因为函数只是直接传递它们的参数，所以不需要额外的函数层。
// 但是，这并不容易阅读，如果你的块比我们在此处显示的更复杂，则此语法可能无法使用。
chooseToppings().then(placeOrder).then(collectOrder).then(eatPizza).catch(failureCallback);

