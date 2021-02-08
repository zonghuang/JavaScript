// 不是所有的回调函数都是异步的，有一些是同步的。一个例子就是使用 Array.prototype.forEach() 来遍历数组
const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];

gods.forEach(function (eachName, index){
  console.log(index + '. ' + eachName);
});

// forEach() 需要的参数是一个回调函数，回调函数本身带有两个参数，数组元素和索引值。它无需等待任何事情，立即运行。