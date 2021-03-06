# Javascript Subclassing 101

## Let's learn some JS Subclassing!


To demonstrate this topic, I will be using a short example of Person(Superclass) one and PersonTwo(Subclass), code is in code.js

The *_Superclass_*, also refered to as the *_Parentclass_* is the Class that Supersedes the following *_Subclass_*.
<br></br>

## Building the Superclass
<br></br>
First, let us create a *_Superclass_* named _Person_

```
const Person = function(age) {
  this.backpack = [];
  this.age = age;
};
```
The Person contructor has two properties
<ul>
  <li> backpack -> Empty Array </li>
  <li> age -> Inputed 'age' parameter </li>
</ul>
Simple enough
<br></br>
<br></br>
We will also add a method called 'addItem' to the Person prototype

```
Person.prototype.addItem = function(item) {
  this.backpack.push(item);
};
```

Now we have our Superclass contructor!
<br></br>

## Building the Subclass
<br></br>
Now, let us create our *_Subclass_* named PersonTwo

```
const PersonTwo = function(age) {
  Person.call(this, age);
}

PersonTwo.prototype = Object.create(Person.prototype);
PersonTwo.prototype.constructor = PersonTwo;

```

### Whoa, what's going on here?

### Let's brake it down
<br></br>

## Subclass inheritance
```
const PersonTwo = function(age) {
  Person.call(this, age);
}
```

Here, we are creating our PersonTwo constructor, and calling the Person constructor function in the context of ' this ' or PersonTwo to inherit the properties of the Superclass using

```
Person.call(this, age);
```

Why do we pass in age?

Well, the Person constructor takes in a input paramater 'age' to assign the value of the property age. If we were to call the Person contructor in the context of PersonTwo, *_without_* passing in the age param like:

```
Person.call(this)
```

We would get behavior like this

```
let newPersonTwo = new PersonTwo(12);

newPersonTwo = {
  age: undefined,
  backpack: [],
}
```

That's not what we want, so by passing in the age input paramter from PersonTwo into the call of Person, we can assign the age of PersonTwo to its input paramater as well.
<br></br>
Giving us behavior like

```
// Calling with Person.call(this, age)

let newPersonTwo = new PersonTwo(12);

newPersonTwo = {
  age: 12,
  backpack: [],
}
```

## Updating the prototype


```
PersonTwo.prototype = Object.create(Person.prototype);
```
Here, we are assigining the prototype of PersonTwo to be a newly created object, created from the Person.prototype.
<br></br>

Your intuition might tell you to do something like

```
PersonTwo.prototype = new Person();
```

This will set the prototype to a new instance of a Person, prototype will then refrence this newly created instance.

OR
```
PersonTwo.prototype = Person.prototype;
```

This will simply set the PersonTwo prototype to refrence to same prototype as Person, this would give unwanted behavior, doing something like...

```
PersonTwo.prototype.addItem = function(thing) {
  return thing;
}
```
Would also effect the prototype.addItem of the Person class as they would be refrencing the same object in memory!

### So remember

```
WRONG!!

PersonTwo.prototype = new Person();
PersonTwo.prototype = Person.prototype;
```

```
Correct!!

PersonTwo.prototype = Object.create(Person.prototype);
```
<br></br>
## Reassign the constructor

```
PersonTwo.prototype.constructor = PersonTwo;
```

When creating the Subclass, we destroyed the original prototype when we call

```
PersonTwo.prototype = Object.create(Person.prototype);
```

As we are assinging the prototype to a Object built from the Person prototype,
we are also reassigning PersonTwos constructor to be Person and not PersonTwo.

```
PersonTwo.prototype.constuctor
Is Equal to ----> Person
```

What if we wanted to call instanceof on an instance of the PersonTwo class?
We would get this behavior..
```
instanceof PersonTwo === Person
instanceof PersonTwo !== PersonTwo
```
This is not behavior we want, the constructor for PersonTwo should be PersonTwo, not Person.

## So, in doing...
```
PersonTwo.prototype = Object.create(Person.prototype);
PersonTwo.prototype.constructor = PersonTwo;
```

<ul>
  <li>First, We set the prototype of PersonTwo to a newly created object, built from the Person.prototype</li>
  <li>Then, we reassign the prototype's constructor to PersonTwo</li>
</ul>

And wha-la, you have correctly structured the prototype of your Subclass!

## Resulting in functionality like..

```
let personOne = new Person(99);
personOne.addItem('Hello');
// personOne => Person { backpack: [ 'Hello' ], age: 99 }

let personTwo = new PersonTwo(14);
personTwo.addItem('World!');
// personTwo => PersonTwo { backpack: [ 'World!' ], age: 14 }
```

## And thats it! Go become Subclassing Masters