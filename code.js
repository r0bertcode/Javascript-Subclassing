//// SUPERCLASS ////

const Person = function(age) {
  this.backpack = [];
  this.age = age;
};

Person.prototype.addItem = function(item) {
  this.backpack.push(item);
};


//// SUBCLASS ////

const PersonTwo = function(age) {
  Person.call(this, age);
};

PersonTwo.prototype = Object.create(Person.prototype);
PersonTwo.prototype.constructor = PersonTwo;

/// Example //

let personOne = new Person(99);
personOne.addItem('Hello');
// personOne => Person { backpack: [ 'Hello' ], age: 99 }

let personTwo = new PersonTwo(14);
personTwo.addItem('World!');
// personTwo => PersonTwo { backpack: [ 'World!' ], age: 14 }
