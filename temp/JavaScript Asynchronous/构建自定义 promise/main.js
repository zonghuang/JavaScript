// 使用 Promise() 构造函数
let timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("Success!");
  }, 2000);
});

timeoutPromise.then((message) => {
  alert(message);
});

// 简化的版本
// timeoutPromise.then(alert);

// 我们将两个方法传递给一个自定义函数：一个用来做某事的消息，一个用来在做这件事之前要经过的时间间隔
/**
首先，我们检查消息是否适合被警告。如果它是一个空字符串或根本不是字符串，我们会使用合适的错误消息拒绝该 promise。
接下来，我们检查间隔是否是适当的间隔值。如果是负数或不是数字，我们会使用合适的错误消息拒绝 promise。
最后，如果参数看起来都正常，我们使用setTimeout()在指定的时间间隔过后，使用指定的消息解析 promise。
 */
function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === "" || typeof message !== "string") {
      reject("Message is empty or not a string");
    } else if (interval < 0 || typeof interval !== "number") {
      reject("Interval is negative or not a number");
    } else {
      setTimeout(function () {
        resolve(message);
      }, interval);
    }
  });
}

// 由于 timeoutPromise() 函数返回一个 Promise，我们可以将 .then()，.catch() 等链接到它上面以利用它的功能。
// 使用 timeoutPromise() 函数
timeoutPromise("Hello there!", 1000)
  .then((message) => {
    alert(message);
  })
  .catch((e) => {
    console.log("Error: " + e);
  });

// 上面的例子，它并不是实际上完全同步。异步性质基本上是使用 setTimeout() 伪造的，尽管它仍然表明 promises 对于创建具有合理的操作流程，良好的错误处理等的自定义函数很有用

// 一个更真实的例子
// 它真正地显示了 Promise() 构造函数的有用异步应用程序。这采用了 IndexedDB API，它是一种旧式的基于回调的API，用于在客户端存储和检索数据，并允许你将其与 promises 一起使用。
function promisifyRequest(request) {
  return new Promise(function(resolve, reject) {
    request.onsuccess = function() {
      resolve(request.result);
    };

    request.onerror = function() {
      reject(reject.error);
    }
  })
}

// 总结
/**
当我们不知道函数的返回值或返回需要多长时间时，Promises是构建异步应用程序的好方法。
它们使得在没有深度嵌套回调的情况下更容易表达和推理异步操作序列，并且它们支持类似于同步try ... catch语句的错误处理方式。
*/