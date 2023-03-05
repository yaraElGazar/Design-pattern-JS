// Memento DP

/** Concept: The Memento pattern provides temporary storage as 
well as restoration of an object. The mechanism in which you 
store the object’s state depends on the required duration of 
persistence, which may vary.*/

/** The most common reason for using this pattern is to capture
  a snapshot of an object’s state so that any subsequent changes 
  can be undone easily if necessary. */

/** In JavaScript Mementos are easily implemented by serializing
    and de-serializing objects with JSON. */

// The objects participating in this pattern are:

/*
1) Originator -- In example code: Person
implements interface to create and restore mementos of itself
    -- in example code: hydrate and dehydrate
the object which state is temporary being saved and restored

2) Memento -- In example code: JSON representation of Person
internal state of the Originator object in some storage format

3) CareTaker -- In example code: CareTaker
responsible for storing mementos
just a repository; does not make changes to mementos
*/

// Person Constructor

let Person = function (name) {
  this.name = name;
};

Person.prototype = {
  hydrate: function () {
    let memento = JSON.stringify(this);
    return memento;
  },

  dehydrate: function (memento) {
    let m = JSON.parse(memento);
    this.name = m.name;
  },
};

let CareTaker = function () {
  this.mementos = {};

  this.add = function (key, memento) {
    this.mementos[key] = memento;
  };

  this.get = function (key) {
    return this.mementos[key];
  };
};

function run() {
  let mike = new Person("Mike");
  let john = new Person("John");

  let careTaker = new CareTaker();

  // Save states
  careTaker.add(1, mike.hydrate());
  careTaker.add(2, john.hydrate());

  // Mess up their names
  mike.name = "King Kong";
  john.name = "Superman";

  //   console.log(mike);
  //   console.log(john);

  // Restore original states
  mike.dehydrate(careTaker.get(1));
  john.dehydrate(careTaker.get(2));

  console.log(mike);
  console.log(john);
}

run();
