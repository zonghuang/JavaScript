/** Step-1.调用 fetch() 方法，将图像的URL作为参数从网络中提取。（这也可以将options对象作为可选的第二个参数）
将 fetch() 返回的 promise 对象存储在一个名为promise的变量中，这个对象代表了一个最初既不成功也不失败的中间状态（pending）
*/
let promise = fetch("coffee.jpg");

/** Step-2. 为了响应成功完成操作
当返回 Response 时，调用 promise 对象的 .then() 方法。
.then()块中的回调（执行程序）仅在 promise 调用成功完成时运行并返回 Response 对象。
当它已被满足时，它将返回的Response对象作为参数传递。

Step-3. 立即对此响应运行 blob() 方法以确保响应主体完全下载，并且当它可用时将其转换为我们可以执行某些操作的 Blob 对象
*/
// let promise2 = promise.then(response => response.blob());

// 响应失败 处理
let promise2 = promise.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return response.blob();
  }
});

/** Step-4. 对 blob 执行一些更复杂的操作
每次调用 .then() 都会创建一个新的promise。这非常有用 —— 因为 blob() 方法也返回一个promise，
我们可以通过调用第二个 promise 的 .then() 方法来处理它在履行时返回的 Blob 对象。
*/
let promise3 = promise2.then(myBlob => {
  // 执行程序函数的主体
  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
});
/** 注解：
这里我们运行 URL.createObjectURL() 方法，将其作为 Blob 在第二个 promise 实现时返回的参数传递。
这将返回指向该对象的 URL。然后我们创建一个 <img> 元素，将其 src 属性设置为等于对象URL并将其附加到 DOM，这样图像就会显示在页面上！
*/

/**
 * 响应失败 处理
 */

let errorCase = promise3.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});
