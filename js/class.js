//class

function Car(loc){
  var obj = {};
  obj.loc = loc;
  obj.move = function(){
    obj.loc++;
  }
  return obj;
}

//create instances

var amy = Car(1);
var ben = Car(9);

amy.move();
ben.move();

//move move out of constructor class , to save execution time and space

function Car(loc){
  var obj = {};
  obj.loc = loc;
  obj.move = move;
  return obj;
}

var move = function (){
  this.loc++;
}

//rebuild instances

var amy = Car(1);amy.move();
var ben = Car(9);ben.move();

//Move move out of the class constructor again - use a paramter object , to add car like methods to new instances of Car

function NewCar(loc){
  var obj = {};
  obj.loc = loc;
  return obj;
}

NewCar.methods = {
  move: function(){
    this.loc++;
  },
  reverse: function(){
    this.loc--;
  }
};

//create instances
var amy = NewCar(1);



//see if amy has methods inherited

console.dir(amy);
console.log(amy.methods);//UNDEFINED

/*
amy was constructed using NewCar , but did not inherit any properties of NewCar
NewCar is not the immediate parent in the prototype delegation
Because , amy was just constructed by NewCar , and not cloned from NewCar
*/


console.log("".__proto__===String.prototype);
console.log([].__proto__===Array.prototype);
console.log(true.__proto__===Boolean.prototype);
console.log({}.__proto__===Object.prototype);
console.log(function(){}.__proto__===Function.prototype);



console.log(String.__proto__);
console.log(Array.__proto__);
console.log(Number.__proto__);
console.log(Boolean.__proto__);
console.log(Function.__proto__);

console.log(String.__proto__===Function.prototype);
console.log(Array.__proto__===Function.prototype);
console.log(Number.__proto__===Function.prototype);
console.log(Boolean.__proto__===Function.prototype);
console.log(Function.__proto__===Function.prototype);
console.log(Object.__proto__===Function.prototype);

console.dir(String.prototype);
console.dir(Array.prototype);
console.dir(Object.prototype);
console.dir(Number.prototype);
console.dir(Boolean.prototype);
console.dir(Function.prototype);

console.log(String.prototype.__proto__===Object.prototype);
console.log(Function.prototype.__proto__===Object.prototype);
console.log(Number.prototype.__proto__===Object.prototype);
console.log(Boolean.prototype.__proto__===Object.prototype);
console.log(Array.prototype.__proto__===Object.prototype);
console.log(Object.prototype.__proto__);//null



//prototypal classes

/*
amy above, did not inherit the methods property of NewCar because, NewCar was not amy's prototype
just a constructor.
in order to enable amy to delegate method lookups, NewCar should be amy's immediate prototypal delegate

Rewrite NewCar, to create objects , that could delegate to NewCar instead of empty dumb objects.
*/


function NewCarPrototypal(loc){
  //var obj = {};
  var obj = Object.create(NewCarPrototypal);
  obj.loc = loc;
  return obj;
}

var amy = NewCarPrototypal(1);

NewCarPrototypal.methods = NewCar.methods;

console.dir(amy);

//doing amy.move();//Error! amy doesnt have the move method!
//amy has a proprty called methods, which has the move method.

//we need amy to implicitly have the move method

//Add every method individually to NewCar?

NewCarPrototypal.move = NewCar.methods.move;

amy.move();//Works!

/*
HOWEVER! amy is supposed to be an object , that is not a clone of the constructor NewCarPrototypal.
by using Object.create(NewCarPrototypal) , amy officially is a clone of the constructor , and not a
new Car object
*/


//Understanding new and Object.create

var CarClass  = function(a){
  if(!a){
    var a=1;
  }
  this.a = a;
  console.log(this);
  return 1;
};
CarClass.move = function(){
  this.a++;
}
CarClass();
var a = new CarClass(1);
console.log(a,a.a);
var b = Object.create(CarClass);
console.dir(b);
console.log(b.a);//undefined because, b is a clone of CarClass and not of the object it constructs
b.move();

//a.move();//wont work because, a is not a clone of CarClass
//add move to the prototype for CarClass and a inherits
CarClass.prototype.move = CarClass.move;
a.move();

/*
new inherits from the prorotype of the constructor function by default
Object.create , needs to be a clone of the prototype to inherit
*/

//Rewrite car constructor class to create a new object instead of a clone
//the new object constructed, should inherit from its prototype

function NewCarPrototypal2(loc){
  var obj = Object.create(NewCarPrototypal2.prototype);
  obj.loc = loc;
  return obj;
}

NewCarPrototypal2.prototype = {
  move:function(){
    this.loc++;
  },
  reverse:function(){
    this.loc--;
  }
};
var amy = NewCarPrototypal2(1);
amy.move();

console.dir(amy);
console.log(amy.constructor);//logs Object constructor
//WHY?
/*with the above delegation , we are overwriting NewCarPrototypal2's prototype.
So, NewCarPrototypal2.prototype is just a literally constructed object, without any association with
the constructor NewCarPrototypal2.
*/

//Rewrite the prototypal delegation example to make amy inherit from the actual NewCarPrototypal2's prototype

function NewCarPrototypal3(loc){
  var obj = Object.create(NewCarPrototypal3.prototype);
  obj.loc = loc;
  return obj;
}

NewCarPrototypal3.prototype.move = function(){
  this.loc++;
}

var amy = NewCarPrototypal3(1);
amy.move();

console.dir(amy);
console.log(amy.constructor);

//back to functional classes

var TheCar = function(loc){
  var obj = {};
  obj.loc = loc;
  obj.move = function(){
    obj.loc++;
  }
  return obj;
}

var amy = TheCar(1);
var ben = TheCar(9);

//subclasses

var Van = function(loc){
  var obj = TheCar(loc);
  obj.grab = function(){};
  return obj;
}

var Cop = function(loc){
  var obj = TheCar(loc);
  obj.call = function(){};
  return obj;
}

//pseudoclassical patterned classes


var PsclCar = function(loc){
  this.loc = loc;
}
PsclCar.prototype.move = function(){
  this.loc++;
};

var zed = new PsclCar(1);
zed.move();

console.log(zed);


//subclasses in pseudoclassical patterned classes

var psclVan = function(loc){
  var obj = new PsclCar(loc);
  return obj;
};

/*
Now the above works and is a vibale solution for inheriting from the superclass PsclCar
However, when we create an instance , using pseudoclassical patterns ,
var may = new psclVan(1);
the instance may , does not inherit from the Van prototype any longer as it should.
The van instance, becomes a car.
We do not need that!
*/

//try .call on PsclCar

var psclVan = function(loc){
  PsclCar.call(this, loc);
  console.log(this);
};

var amy = new psclVan(1);
console.log(amy);
/*amy now inherits from the psclVan prototype , but doesn't yet include a delegation to the move method
Since psclVan is a subclass of PsclCar , it has to give access to the move method in the PsclCar prototype
*/
//what if we do psclVan.prototype equal to PsclCar.prototype?

psclVan.prototype = PsclCar.prototype;

console.log(amy);//still does not inherit move because, amy is already created as a van with the original psclVan
//prototype. we need to recreate amy after we change psclVan's prototype

var amy = new psclVan(1);

console.log(amy);//Now we have the move method inherited

//can psclVan now have its own special methods?

psclVan.prototype.grab = function(){};

console.log(amy);//so amy has the grab method now.

//does zed also have the grab method?

console.log(zed);//Yes! because, we equated van's prototype to car's prototype

//we dont want that!

//what if we make a clone of the super class' prototype?
//first we remove the grab method from PsclCar


delete PsclCar.prototype.grab;

psclVan.prototype = Object.create(PsclCar.prototype);

var amy = new psclVan(1);

console.log(amy);
amy.move();
console.log(amy);

//If we look at the log , amy shows up alright, albeit, with the constructor set to PsclCar
//amy being an instance of psclVan , we need to set the constructor back to psclVan

console.dir(zed.constructor);
console.dir(amy.constructor);

psclVan.prototype.constructor = psclVan;

console.dir(zed.constructor);
console.dir(amy.constructor);

var myString = new String();
console.dir(myString);
