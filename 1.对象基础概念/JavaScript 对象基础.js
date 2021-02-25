// 创建一个空对象
// const person = {};

// 创建一个有属性和方法的对象
const person = {
  name: ["Bob", "Smith"],
  age: 18,
  gender: "male",
  interests: ["music", "skiing"],
  greeting: function () {
    console.log("Hi! I'm " + this.name[0] + ".");
  },
};

// 点表示法
// 使用点表示法来访问对象的属性和方法
person.name[0];
person.name[1];
person.greeting();

// 子命名空间
person.name = {
  first: "Bob",
  last: "Smith",
};
// 上面实际上创建了一个子命名空间，只需要链式的再使用一次点表示法
person.name.first;
person.name.last;

// 括号表示法
// 使用括号表示法访问对象的属性
person["age"];
person["name"]["first"];

// 设置对象成员
// 更新已经存在的属性的值
person.age = 20;
person["name"]["last"] = "Cratchit";
// 创建新的成员
person["eyes"] = "hazel";
person.farewell = function () {
  console.log("Bye everybody!");
};

// 括号表示法的优点：它不仅可以动态的去设置对象成员的值，还可以动态的去设置成员的名字。
const myDataName = "height";
const myDataValue = "1.75m";
person[myDataName] = myDataValue;
console.log(person.height);
// 这是使用点表示法无法做到的，点表示法只能接受字面量的成员的名字，不接受变量作为名字。

// "this"的含义
/*
greeting: function () {
  console.log("Hi! I'm " + this.name[0] + ".");
}
*/
// 关键字"this"指向了当前代码运行时的对象。
// 我们开始使用构造器(constructor)时，"this"是非常有用的。它保证了当代码的上下文改变时变量的值的正确性（比如：不同的person对象拥有不同的name这个属性）
