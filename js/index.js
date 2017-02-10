var amy={loc:1};
var ben={loc:9};
amy.loc++;
ben.loc++;

//automate loc increments

var move = function(car){
  car.loc++;
}
move(amy);
move(ben);

//build a decorator to create cars

var carlike = function(obj,loc){
  var obj = {};
  obj.loc = loc;
  obj.move = move;
  return obj;
}

//edit function move to increment loc without accepting parameter car

var move = function(){this.loc++};

var amy = carlike("amy",1);
console.dir(amy);
var ben = carlike("ben",9);
console.dir(ben);

amy.move();
ben.move();

// move move into the constructing decorator. saves global memory , but increases execution memory
//builds a new move method for every instance constructed by carlike

var carlike  = function(obj,loc){
  var obj = {};
  obj.loc = loc;
  obj.move = function(){this.loc++};
  return obj;

}

var amy = carlike("amy",1);
var ben = carlike("ben",9);
console.dir(amy);
console.dir(ben);

//carlike decorator's addition of move method, means, each instance's move method , is a closure
//because even after carlike returns the new object at every call to construct a carlike object,
//the move method retains the scoped value of obj.

//remove parameter this in favour of using the closure

// when amy is constructed , and amy.move is called, the obj within amy's move method refers to amy

var carlike = function(obj,loc){
  var obj = {};
  obj.loc = loc;
  obj.move = function(){obj.loc++};
  return obj;
}

var amy = carlike("amy",1);
var ben = carlike("ben",9);

amy.move();
ben.move();

console.dir(amy);
console.dir(ben);
