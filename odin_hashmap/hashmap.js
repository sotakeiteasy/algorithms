const { LinkedList } = require("./linked-lists");
class HashMap {
  constructor(capacity) {
    this.capacity = 16;
    this.map = [];
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);

    if (!this.has(key)) {
      if (this.length() / this.capacity >= this.loadFactor) {
        let tempArray = [...this.entries()];
        this.capacity = this.capacity * 2;
        this.map = new Array(this.capacity);
        tempArray.forEach((list) => this.set(list.key, list.value));
      }

      if (!this.map[hashCode]) {
        this.map[hashCode] = new LinkedList().append({ key, value });
      } else {
        this.map[hashCode].append({ key, value });
      }
    } else {
      let current = this.map[hashCode].head;
      let found = false;
      while (current) {
        if (current.value.key === key) {
          current.value.value = value;
          found = true;
          break;
        }
        current = current.next;
      }
      if (!found) this.map[hashCode].append({ key, value });
    }

    return this;
  }

  get(key) {
    let hashCode = this.hash(key);
    let current = this.map[hashCode].head;
    while (current) {
      if (current.value.key === key) return current.value.value;
      current = current.next;
    }

    return null;
  }

  has(key) {
    let hashCode = this.hash(key);
    if (this.map[hashCode]) {
      let current = this.map[hashCode].head;
      while (current) {
        if (current.value.key === key) return true;
        current = current.next;
      }
    }

    return false;
  }

  remove(key) {
    let hashCode = this.hash(key);
    if (!this.has(key)) return false;

    let current = this.map[hashCode].head;
    for (let i = 0; i < this.map[hashCode].size(); i++) {
      if (current.value.key === key) {
        this.map[hashCode].removeAt(i);
        return true;
      }
      current = current.next;
    }
  }

  length() {
    return this.map.reduce((acc, list) => (list ? acc + list.size() : acc), 0);
  }

  clear() {
    this.map = [];
    this.capacity = 16;
    this.loadFactor = 0;

    return this;
  }

  keys() {
    let array = [];
    this.map.map((el) => {
      if (el) {
        let current = el.head;
        while (current) {
          array.push(current.value.key);
          current = current.next;
        }
      }
    });
    return array;
  }

  values() {
    let array = [];
    this.map.map((el) => {
      if (el) {
        let current = el.head;
        while (current) {
          array.push(current.value.value);
          current = current.next;
        }
      }
    });
    return array;
  }

  entries() {
    let array = [];
    this.map.map((el) => {
      if (el) {
        let current = el.head;
        while (current) {
          array.push(current.value);
          current = current.next;
        }
      }
    });
    return array;
  }
}

module.exports = { HashMap };
