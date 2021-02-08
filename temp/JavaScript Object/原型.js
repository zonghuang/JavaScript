function doSomething() {}
console.log(doSomething.prototype);

/*
const doSomething = function () {};
console.log(doSomething.prototype);
*/

// 添加一些属性到 doSomething 的原型上面
doSomething.prototype.foo = 'bar';
console.log(doSomething.prototype);

// 使用 new 运算符来在现在的这个原型基础之上，创建一个 doSomething 的实例
doSomething.prototype.foo = 'bar'; // 向原型添加属性
const doSomeInstancing = new doSomething();
doSomeInstancing.prop = 'some value'; // 在对象上添加属性
console.log(doSomeInstancing);

console.log('doSomeInstancing.prop:      ' + doSomeInstancing.prop); // some value
console.log('doSomeInstancing.foo:       ' + doSomeInstancing.foo); // bar
console.log('doSomething.prop:           ' + doSomething.prop); // undedined
console.log('doSomething.foo:            ' + doSomething.foo); // undedined
console.log('doSomething.prototype.prop: ' + doSomething.prototype.prop); // undedined
console.log('doSomething.prototype.foo:  ' + doSomething.prototype.foo); // bar

function Person(first, last, age, gender, interests) {
  this.name = { first: first, last: last };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function () {};
  this.greeting = function () {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
}

// 创建一个对象实例
const person1 = new Person('Tammi', 'Smith', 32, 'neutral', ['music', 'skiing', 'kickboxing']);

// prototype 属性：继承成员被定义的地方
Person.prototype; // 检查已有的 prototype 属性（比较少）
Object.prototype; //  Object 的 prototype 属性上定义了大量的方法

// 原型链的运作机制：person1 → Person → Object
person1.valueOf();

// 用 Object.create() 方法创建新的对象实例。create() 实际做的是从指定原型对象创建一个新的对象
const person2 = Object.create(person1); // 以 person1 为原型对象创建了 person2 对象

// 下面都将返回 Person() 构造器，因为该构造器包含这些实例的原始定义
person1.constructor;
person2.constructor;

// 用这个构造器创建另一个对象实例
// 通常你不会去用这种方法创建新的实例，但如果你刚好因为某些原因没有原始构造器的引用，那么这种方法就很有用了。
const person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);

// 尝试访问新建对象的属性
person3.name.first;
person3.age;
person3.bio();

// constructor 属性还有其他用途：获得某个对象实例的构造器的名字
person1.constructor.name  // Person


// 修改原型
// 为构造器的 prototype 属性添加一个新的方法。这样，整条继承链动态地更新了，任何由此构造器创建的对象实例都自动获得了这个方法。
Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
};
person1.farewell();

// 这证明了先前描述的原型链模型：
// 这种继承模型下，上游对象的方法不会复制到下游的对象实例中；下游对象本身虽然没有定义这些方法，但浏览器会通过上溯原型链、从上游对象中找到它们。
// 这种继承模型提供了一个强大而可扩展的功能系统。


// 为构造器的 prototype 属性添加一个新的属性
Person.prototype.fullName = this.name.first + ' ' + this.name.last; // 这么做是无效的，因为本例中 this 引用全局范围，而非函数范围。访问这个属性只会得到 undefined undefined
person1.fullName;   // undefined undefined

Person.prototype.fullName = this.name.first + ' ' + this.name.last; 

/**
 * 一种极其常见的对象定义模式：
 * 1. 在构造器（函数体）中定义属性；
 * 2. 在 prototype 属性上定义方法。
 * 如此，构造器只包含属性定义，而方法则分装在不同的代码块，代码更具可读性。
 */
// 构造器及其属性定义

function Test(a,b,c,d) {
  // 属性定义
};

// 定义第一个方法
Test.prototype.x = function () { /* ... */ }

// 定义第二个方法
Test.prototype.y = function () { /* ... */ }

// 等等...
