/*
let a = fetch(url1);
let b = fetch(url2);
let c = fetch(url3);

Promise.all([a, b, c]).then((values) => {
  
});
*/

/**
Promise.all()
将一个 promise 数组作为输入参数，并返回一个新 Promise 对象，该对象仅在且仅当阵列 fulfil 中的所有 promise 满足时才会实现
*/

// 我们的代码不在乎 fetch() 操作何时完成。相反，我们想要的是加载的数据。这意味着我们要在 Promise.all() 返回代表图像的可用 blob 和可用文本字符串时运行该块。
/**
此外，您可以确定要获取的文件类型，而无需显式 type 属性。
例如，您可以Content-Type分别使用来检查响应的 HTTP 标头 response.headers.get("content-type")，然后做出相应的反应。
*/
function fetchAndDecode(url, type) {
  return fetch(url)
    .then((response) => {
      if (type === "blob") {
        return response.blob();
      } else if (type === "text") {
        return response.text();
      }
    })
    .catch((e) => {
      console.log(
        "There has been a problem with your fetch operation: " + e.message
      );
    });
}

let coffee = fetchAndDecode("coffee.jpg", "blob");
let tea = fetchAndDecode("tea.jpg", "blob");
let description = fetchAndDecode("description.txt", "text");

Promise.all([coffee, tea, description]).then((values) => {
  console.log(values);
  // 将承诺返回的每个值存储在单独的变量中，从 blob 创建对象 url
  let objectURL1 = URL.createObjectURL(values[0]);
  let objectURL2 = URL.createObjectURL(values[1]);
  let descText = values[2];

  // 在 <img> 元素中显示图像
  let image1 = document.createElement("img");
  let image2 = document.createElement("img");
  image1.src = objectURL1;
  image2.src = objectURL2;
  document.body.appendChild(image1);
  document.body.appendChild(image2);

  // 在段落中显示文本
  let para = document.createElement("p");
  para.textContent = descText;
  document.body.appendChild(para);
});
