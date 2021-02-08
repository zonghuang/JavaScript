/**  setTimeout()：在指定的时间后执行一段特定代码。
 参数：
    1. 要运行的函数，或者函数引用
    2. 表示在执行代码之前等待的时间间隔的数字 (以毫秒为单位，所以1000等于1秒)，如果指定值为 0 (或完全省略该值)，函数将 尽快运行
    3. 更多的参数：在指定函数运行时，希望传递给函数的值
注：
1. 指定的时间（或延迟）不能保证在指定的确切时间之后执行，而是最短的延迟执行时间。在主线程上的堆栈为空之前，传递给这些函数的回调将无法运行。
2. 像 setTimeout(fn, 0) 这样的代码将在堆栈为空时立即执行，而不是立即执行
 */

// 指定的函数是匿名函数
let myGreeting = setTimeout(function () {
  alert("Hello, Mr. Universe!");
}, 2000);

// 指定的函数有函数名
let myGreeting = setTimeout(function sayHi() {
  alert("Hello, Mr. Universe!");
}, 2000);

// 单独定义一个函数（在其他地方定义）
// 如果我们有一个函数既需要从超时调用，也需要响应某个事件，那么这将非常有用。
let myGreeting = setTimeout(sayHi, 2000);
function sayHi() {
  alert("Hello Mr. Universe!");
}

// 传递参数给 setTimeout()
let myGreeting = setTimeout(sayHi, 2000, "Mr. Universe");
function sayHi(who) {
  alert("Hello " + who + "!");
}

// 清除超时
// 将 setTimeout() 调用的标识符作为参数传递给它，从而在超时运行之前取消
clearTimeout(myGreeting);

/**  setInterval()：以固定的时间间隔，重复运行一段代码
 参数：setTimeout() 相似，只是作为第一个参数传递给它的函数，重复执行的时间不少于第二个参数给出的毫秒数，而不是一次执行。
 */
// 例子：使用 setInterval() 每秒运行该函数一次，创建一个每秒更新一次的数字时钟的效果。
const createClock = setInterval(displayTime, 1000);
function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.getElementById("demo").textContent = time;
}

// 清除 intervals
clearInterval(createClock);

/**
 关于 setTimeout() 和 setInterval() 需要注意的几点：
 */
// 1.  当你的代码有可能比你分配的时间间隔，花费更长时间运行时，最好使用递归的 setTimeout() 
// 这将使执行之间的时间间隔保持不变，无论代码执行多长时间，你不会得到错误。
let i = 1;
setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);

let i = 1;
setInterval(function run() {
  console.log(i);
  i++;
}, 100);

// 2. 立即超时
// 如果您希望设置一个代码块以便在所有主线程完成运行后立即运行，这将很有用。将其放在异步事件循环中，这样它将随后直接运行。
setTimeout(function () {
  alert("World");
}, 0);

alert("Hello");

// 3. clearTimeout() 和 clearInterval() 都可以清除 setTimeout() 和 setInterval()，但是应保持一致性

/**
 requestAnimationFrame()：一个专门的循环函数，旨在浏览器中高效运行动画。
  它基本上是现代版本的setInterval()，它在浏览器重新加载显示内容之前执行指定的代码块，从而允许动画以适当的帧速率运行，不管其运行的环境如何。
注：setInterval() 并不是针对设备优化的帧率运行，有时会丢帧
*/
// 该方法将重新加载页面之前要调用的回调函数作为参数。
function draw() {
  // Drawing code goes here
  requestAnimationFrame(draw);
}
draw();
/**
这个想法是要定义一个函数，在其中更新动画 (例如，移动精灵，更新乐谱，刷新数据等)，然后调用它来开始这个过程。
在函数的末尾，以 requestAnimationFrame() 传递的函数作为参数进行调用，这指示浏览器在下一次显示重新绘制时再次调用该函数。
然后这个操作连续运行， 因为requestAnimationFrame() 是递归调用的。
*/

/**
如果要执行某种简单的常规DOM动画, CSS 动画 可能更快，因为它们是由浏览器的内部代码计算而不是JavaScript直接计算的。
但是，如果您正在做一些更复杂的事情，并且涉及到在DOM中不能直接访问的对象(such as 2D Canvas API or WebGL objects), requestAnimationFrame() 在大多数情况下是更好的选择。
*/