// 普通函数
function hello() {
  return "Hello";
}
hello();

// 异步函数
async function hello() {
  return "Hello";
}
hello();
// 现在调用该函数会返回一个 promise。这是异步函数的特征之一（它保证函数的返回值为 promise）

// 创建一个异步函数表达式
let hello = async function () {
  return "Hello";
};
hello();

// 使用箭头函数
let hello = async () => {
  return "hello";
};

// 要实际使用 promise 完成时返回的值，我们可以使用 .then() 块，因为它返回的是 promise
hello().then((value) => {
  console.log(value);
});

/**
 * await 关键字
当 await 关键字与异步函数一起使用时，它的真正优势就变得明显了：
await 只在异步函数里面才起作用。它可以放在任何异步的，基于 promise 的函数之前。
它会暂停代码在该行上，直到 promise 完成，然后返回结果值。在暂停的同时，其他正在等待执行的代码就有机会执行了。
 */
async function hello() {
  return greeting = await Promise.resolve("Hello");
};

hello().then(alert);