// 这里fetch() 只需要一个参数：资源的网络 URL。它返回一个 promise，promise 是表示异步操作完成或失败的对象。
fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    products = json;
    initialize();
  })
  .catch(function (err) {
    console.log("Fetch problem: " + err.message);
  });
/*
两个 then() 块。两者都包含一个回调函数，如果前一个操作成功，该函数将运行，并且每个回调都接收前一个成功操作的结果作为输入，因此您可以继续对它执行其他操作。
每个 .then() 块返回另一个 promise，这意味着可以将多个 .then() 块链接到另一个块上，这样就可以依次执行多个异步操作。

如果其中任何一个 then() 块失败，则在末尾运行 catch() 块——与同步 try...catch 类似，catch() 提供了一个错误对象，可用来报告发生的错误类型。
但是请注意，同步 try...catch 不能与 promise 一起工作，尽管它可以与 async/await 一起工作，稍后您将了解到这一点。
*/

/** 事件队列
像 promise 这样的异步操作被放入事件队列中，事件队列在主线程完成处理后运行，这样它们就不会阻止后续JavaScript代码的运行。
排队操作将尽快完成，然后将结果返回到JavaScript环境。
*/

/** Promises（新式回调） 对比 callbacks（旧式回调）
Promises 和 callbacks ：它们本质上是一个返回的对象，您可以将回调函数附加到该对象上，而不必将回调作为参数传递给另一个函数。
Promises 优点：
1. 可以使用多个 then() 操作将多个异步操作链接在一起，并将其中一个操作的结果作为输入传递给下一个操作。而 callbacks（旧式回调）容易形成回调地狱
2. Promise 总是严格按照它们放置在事件队列中的顺序调用。
3. 错误处理好。所有的错误都由块末尾的一个 .catch() 块处理，而不是在“金字塔”的每一层单独处理。
*/