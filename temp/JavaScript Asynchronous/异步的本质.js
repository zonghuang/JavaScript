console.log("Starting");
let image;

fetch("coffee.jpg")
  .then((response) => {
    console.log("It worked :)");
    return response.blob();
  })
  .then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((error) => {
    console.log("There has been a problem with your fetch operation: " + error.message);
  });

console.log("All done!");

/**
 * 第一个和第三个console.log()消息将立即显示，但是第二个消息将被阻塞，直到有人单击鼠标按钮。
 * 前面的示例以相同的方式工作，只是在这种情况下，第二个消息在promise链上被阻塞，直到获取资源后再显示在屏幕上，而不是单击。
 */

console.log("registering click handler");

button.addEventListener("click", () => {
  console.log("get click");
});

console.log("all done");

/**
小结：
JavaScript 是一种同步的、阻塞的、单线程的语言，在这种语言中，一次只能执行一个操作。
但 web 浏览器定义了函数和 API，允许我们当某些事件发生时不是按照同步方式，而是异步地调用函数(比如，时间的推移，用户通过鼠标的交互，或者获取网络数据)。
这意味着您的代码可以同时做几件事情，而不需要停止或阻塞主线程。
 */

console.log("Starting");
let image;

fetch("coffee.jpg")
  .then((response) => {
    console.log("It worked :)");
    return response.blob();
  })
  .then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .then(() => {
    console.log("All done! " + image.src + " displayed.");
  })
  .catch((err) => {
    console.log("There has been a problem with your fetch operation: " + err.message);
  });
