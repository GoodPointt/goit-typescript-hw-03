class Key {
  private signature: number;

  constructor() {
    this.signature = Math.round(Date.now() * Math.random());
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey() {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected key: Key;
  private tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (!this.door)
      throw new Error('⚠️Person cant enter - the door is closed.');
    this.tenants.push(person);
    console.log('✅Person entered successfully');
  }
  abstract OpenDoor(key: Key): void;
}

class MyHouse extends House {
  OpenDoor(key: Key): void {
    if (key.getSignature() !== this.key.getSignature())
      throw new Error('⚠️Wrong key!');
    this.door = true;
    console.log('✅The door is successfully opend!');
  }
}

const key = new Key();
console.log(key);

const key2 = new Key();
console.log(key2);

const house = new MyHouse(key);
const person = new Person(key);

house.OpenDoor(person.getKey());

house.comeIn(person);

export {};
