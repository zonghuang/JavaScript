function doSomething() {}
console.log(doSomething.prototype);

// const doSomething = function() {};
// console.log(doSomething.prototype);

// 在原型上添加一个属性
doSomething.prototype.foo = "bar";

// 使用 new 运算符创建一个 doSomething 的实例
const doSomeInstancing = new doSomething();
// 实例化对象后，就可以在对象上添加属性
doSomeInstancing.prop = "some value";
console.log(doSomeInstancing);

console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);      // some value
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);       // bar
console.log("doSomething.prop:           " + doSomething.prop);           // undefined
console.log("doSomething.foo:            " + doSomething.foo);            // undefined
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop); // undefined
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);  // bar

function Person(first, last, age, gender, interests) {
  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {};
  this.greeting = function() {};
};

const person1 = new Person('Bob', 'Smith', 18, 'male', ['music', 'skiing']);

person1.valueOf();
