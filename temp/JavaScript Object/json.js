/**
 * 1. 创建一个即将访问的 URL
 * 2. 创建一个 HTTP 请求
 * 3. 使用 open() 函数打开一个新的请求。（2 个参数必传参数，其它的是可选参数）
 *   ① HTTP 方法，网络连接时使用
 *   ② URL，用于指向请求的地址
 * 4. 指定响应中包含的数据类型
 * 5. 发送请求
 * 6. 事件处理函数：处理自服务器响应返回的数据
 *   我们把代码包在事件处理函数中，当请求对象 load 事件触发时执行代码，这是因为请求对象 load 事件只有在请求成功时触发；这种方式可以保证事件触发时 request.response 是绝对可以访问的。
 */
const requestURL =
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  const superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
};

function populateHeader(jsonObj) {
  const myH1 = document.createElement("h1");
  myH1.textContent = jsonObj["squadName"];
  header.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent =
    "Hometown: " + jsonObj["homeTown"] + " // Formed: " + jsonObj["formed"];
  header.appendChild(myPara);
}

function showHeroes(jsonObj) {
  const heroes = jsonObj["members"];

  for (i = 0; i < heroes.length; i++) {
    const myArticle = document.createElement("article");
    const myH2 = document.createElement("h2");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    const myPara3 = document.createElement("p");
    const myList = document.createElement("ul");

    myH2.textContent = heroes[i].name;
    myPara1.textContent = "Secret identity: " + heroes[i].secretIdentity;
    myPara2.textContent = "Age: " + heroes[i].age;
    myPara3.textContent = "Superpowers:";

    const superPowers = heroes[i].powers;
    for (j = 0; j < superPowers.length; j++) {
      const listItem = document.createElement("li");
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}

/** 对象和文本间的转换
parse(): 以文本字符串形式接受 JSON 对象作为参数，并返回相应的对象。
stringify(): 接收一个对象作为参数，返回一个对应的 JSON 字符串。
*/
// 例如：接收到一些 字符串作为 JSON 数据，然后我们想要将它转换为对象
request.responseType = "text";                      // 接收的是字符串
request.onload = function () {
  const superHeroesText = request.response;         // 从响应中获取的字符串
  const superHeroes = JSON.parse(superHeroesText);  // 将其转换为对象
};

// 例如：当我们想要发送 JSON 数据作为信息，我们将需要转换它为字符串
const myJSON = { "name" : "Chris", "age" : "38" };
const myString = JSON.stringify(myJSON);
