function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last,
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
}

Person.prototype.bio = function () {
  let string =
    this.name.first + " " + this.name.last + " is " + this.age + " years old. ";
  let pronoun;
  if (
    this.gender === "male" ||
    this.gender === "Male" ||
    this.gender === "m" ||
    this.gender === "M"
  ) {
    pronoun = "He likes ";
  } else if (
    this.gender === "female" ||
    this.gender === "Female" ||
    this.gender === "f" ||
    this.gender === "F"
  ) {
    pronoun = "She likes ";
  } else {
    pronoun = "They like ";
  }
  string += pronoun;
  if (this.interests.length === 1) {
    string += this.interests[0] + ".";
  } else if (this.interests.length === 2) {
    string += this.interests[0] + " and " + this.interests[1] + ".";
  } else {
    for (let i = 0; i < this.interests.length; i++) {
      if (i === this.interests.length - 1) {
        string += "and " + this.interests[i] + ".";
      } else {
        string += this.interests[i] + ", ";
      }
    }
  }
  alert(string);
};

Person.prototype.greeting = function () {
  alert("Hi! I'm " + this.name.first + ".");
};

Person.prototype.farewell = function () {
  alert(this.name.first + " has left the building. Bye for now!");
};

// 定义 Teacher() 构造器函数
function Teacher(first, last, age, gender, interests, subject) {
  // call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
  // call() 方法 和 apply() 方法的区别：call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。
  Person.call(this, first, last, age, gender, interests); // this 指向 Teacher() 函数（用的是传送给 Teacher()，而不是 Person() 的值）

  this.subject = subject;
}

let person1 = new Person("Tammi", "Smith", 17, "female", [
  "music",
  "skiing",
  "kickboxing",
]);

// 从无参构造函数继承（不会继承通过参数设置的父级的任何属性）
/*
function Brick() {
  this.width = 10;
  this.height = 20;
}

function BlueGlassBrick() {
  Brick.call(this);

  this.opacity = 0.5;
  this.color = "blue";
}
const brick = new BlueGlassBrick();
console.log(brick.width, brick.height, brick.opacity, brick.color);  // 10 20 0.5 blue
*/

// 如何让 Teacher() 从 Person() 的原型对象里继承方法？

// Step 1. 用 create() 函数来创建一个和 Person.prototype 一样的新的原型属性值，然后将其作为 Teacher.prototype 的属性值。
Teacher.prototype = Object.create(Person.prototype); // 这意味着 Teacher.prototype 会继承 Person.prototype 的所有属性和方法。

// Step 2. 现在 Teacher() 的 prototype 的 constructor 属性指向的是 Person()，输入以下代码来确认
Teacher.prototype.constructor;

// Step 3. 这或许会成为很大的问题，所以我们需要将其正确设置，回到源代码
Teacher.prototype.constructor = Teacher;

// Step 4. 重新验证
Teacher.prototype.constructor;

/*
每一个函数对象（Function）都有一个 prototype 属性，并且只有函数对象有 prototype 属性，因为 prototype 本身就是定义在 Function 对象下的属性。
当我们输入类似 const person1=new Person(...) 来构造对象时，JavaScript 实际上参考的是 Person.prototype 指向的对象来生成 person1。
另一方面，Person() 函数是 Person.prototype 的构造函数，也就是说 Person === Person.prototype.constructor
*/
Person === Person.prototype.constructor; // true

/*
在定义新的构造函数 Teacher 时，我们通过 function.call 来调用父类的构造函数，
但是这样无法自动指定 Teacher.prototype 的值，这样 Teacher.prototype 就只能包含在构造函数里构造的属性，而没有方法。
因此我们利用 Object.create() 方法将 Person.prototype 作为 Teacher.prototype 的原型对象，并改变其构造器指向，使之与 Teacher 关联。

任何您想要被继承的方法都应该定义在构造函数的 prototype 对象里，并且永远使用父类的 prototype 来创造子类的 prototype，这样才不会打乱类继承结构。
*/

Teacher.prototype.greeting = function () {
  let prefix;

  if (
    this.gender === "male" ||
    this.gender === "Male" ||
    this.gender === "m" ||
    this.gender === "M"
  ) {
    prefix = "Mr.";
  } else if (
    this.gender === "female" ||
    this.gender === "Female" ||
    this.gender === "f" ||
    this.gender === "F"
  ) {
    prefix = "Mrs.";
  } else {
    prefix = "Mx.";
  }

  alert(
    "Hello. My name is " +
      prefix +
      " " +
      this.name.last +
      ", and I teach " +
      this.subject +
      "."
  );
};

const teacher1 = new Teacher(
  "Dave",
  "Griffiths",
  31,
  "male",
  ["football", "cookery"],
  "mathematics"
);

// 下面三个进入到从 Person() 的构造器 继承的属性和方法
teacher1.name.first;
teacher1.interests[0];
teacher1.bio();
// 下面两个则是只有 Teacher() 的构造器才有的属性和方法
teacher1.subject;
teacher1.greeting();

// 对象成员总结
// 基本了解以下三种属性或者方法：
/*
1. 那些定义在构造器函数中的、用于给予对象实例的。
  这些在您自己的代码中，它们是构造函数中使用 this.x = x 类型的行；
  在内置的浏览器代码中，它们是可用于对象实例的成员（通常通过使用 new 关键字调用构造函数来创建，例如 const myInstance = new myConstructor()）

2. 那些直接在构造函数上定义、仅在构造函数上可用的。
  这些通常仅在内置的浏览器对象中可用，并通过被直接链接到构造函数而不是实例来识别。 例如 Object.keys()
3. 那些在构造函数原型上定义、由所有实例和对象类继承的。
  这些包括在构造函数的原型属性上定义的任何成员，如myConstructor.prototype.x()
*/

// 何时在 JavaScript 中使用继承？
// 由于原型链等特性的存在，在不同对象之间功能的共享通常被叫做 委托 —— 特殊的对象将功能委托给通用的对象类型完成。
// 在使用继承时，建议您不要使用过多层次的继承，并仔细追踪定义方法和属性的位置。（很有可能您的代码会临时修改了浏览器内置对象的原型）
// 如果您只是需要 一个单一的对象实例，使用对象常量会好些，不需要使用继承。对象在您打算把一个数据集合从一个地方传递到另一个地方的时候非常有用。
// 如果您开始创建 一系列拥有相似特性的对象时，那么创建一个包含所有共有功能的通用对象，然后在更特殊的对象类型中继承这些特性，将会变得更加方便有用。
