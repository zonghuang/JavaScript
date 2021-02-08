// 在类/对象方法前面添加 async，以使它们返回 promises，并 await 它们内部的 promises
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = { first, last };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  async greeting() {
    return await Promise.resolve(`Hi! I'm ${this.name.first}`);
  }

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  }
}

let han = new Person("Han", "Solo", 25, "male", ["Smuggling"]);
han.greeting().then(console.log);
han.farewell();

/** 输出：
Han has left the building. Bye for now!
Hi! I'm Han
*/
