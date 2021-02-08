// 使用 async/await 重写 promise 代码
async function myFetch() {
  let response = await fetch("coffee.jpg");
  let myBlob = await response.blob();

  let objectURL = URL.createObjectURL(myBlob);
  let image = document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
}

myFetch().catch((e) => {
  console.log(e.message);
});

// 使用 promise 和 await 的混合方式，将函数的后半部分抽取到新代码块中。
async function myFetch() {
  let response = await fetch("coffee.jpg");
  return await response.blob();
}

myFetch()
  .then((blob) => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) => {
    console.log(e.message);
  });

/**
 * 等待 Promise.all()
 */

async function fetchAndDecode(url, type) {
  let response = await fetch(url);
  let content;
  if (type === "blob") {
    content = await response.blob();
  } else if (type === "text") {
    content = await response.text();
  }
  return content;
}

async function displayContent() {
  let coffee = fetchAndDecode("coffee.jpg", "blob");
  let tea = fetchAndDecode("tea.jpg", "blob");
  let description = fetchAndDecode("description.txt", "text");

  let values = await Promise.all([coffee, tea, description]);

  let objectURL1 = URL.createObjectURL(values[0]);
  let objectURL2 = URL.createObjectURL(values[1]);
  let descText = values[2];

  let image1 = document.createElement("img");
  let image2 = document.createElement("img");
  image1.src = objectURL1;
  image2.src = objectURL2;
  document.body.appendChild(image1);
  document.body.appendChild(image2);

  let para = document.createElement("p");
  para.textContent = descText;
  document.body.appendChild(para);
}

displayContent().catch((e) => console.log(e));

/**
 * async/await 的缺陷
Async/await 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。
await 关键字会阻塞其后的代码，直到 promise 完成。

程序因为大量await的promises相继发生而变慢。每个await都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理
 */

// 解决方案：通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。
//  详见：slow-async-await.html （所用时间(毫秒):9033） 和 fast-async-await.html （所用时间(毫秒):3008）
