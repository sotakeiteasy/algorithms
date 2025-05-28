"use strict";

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node();
  }

  append(value) {
    if (!this.head.value) this.head = new Node(value);
    else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = new Node(value);
    }
    return this;
  }

  prepend(value) {
    if (!this.head.value) this.head = new Node(value);
    else this.head = new Node(value, this.head);
    return this;
  }

  size() {
    let count = 0,
      current = this.head;
    while (current) {
      current = current.next;
      count++;
    }
    return count;
  }

  tail() {
    let current = this.head;
    while (current.next) current = current.next;
    return current;
  }

  at(index) {
    let current = this.head,
      i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  pop() {
    let current = this.head,
      prev;
    if (this.size() === 1) this.head.value = null;
    else {
      while (current.next) {
        prev = current;
        current = current.next;
      }
    }
    prev.next = null;
    return this;
  }

  contains(value) {
    let current = this.head;
    while (current.next) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  find(value) {
    let current = this.head,
      i = 0;
    while (current.next) {
      if (current.value === value) return i;
      current = current.next;
      i++;
    }
    return null;
  }

  toString() {
    let string = "";
    let current = this.head;
    while (current) {
      string += `( ${current.value} ) -> `;
      current = current.next;
    }
    string += "null";
    return string;
  }

  insertAt(value, index) {
    if (index === 0) this.prepend(value);
    if (index !== 0 && index === this.length) this.append(value);
    if (index > 0) {
      const prev = this.at(index - 1);
      const current = this.at(index - 1);

      prev.next = new Node(value, current.next);
    }

    return this;
  }

  removeAt(index) {
    if (index === 0) this.head = this.head.next;
    else {
      let prev = this.at(index - 1);
      let nodeToDelete = this.at(index);
      prev.next = nodeToDelete.next;
    }
    return this;
  }
}

module.exports = { LinkedList };
