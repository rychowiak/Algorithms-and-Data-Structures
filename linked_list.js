class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  //Add elements at end of list
  append(value) {
    this.length++;
    const newNode = new Node(value);

    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
      return newNode;
      // this.head = new Node(value, this.head);
    }

    this.head = this.tail = newNode;
    return newNode;
  }
  //Add elements at beginning of list
  prepend(value) {
    this.length++;
    this.head = new Node(value, this.head);
  }

  removeLastNode() {
    this.length--;
    if (this.tail) {
      const lastNode = this.tail;

      let currentNode = this.head;
      while (currentNode.next !== lastNode) {
        currentNode = currentNode.next;
      }
      this.tail = currentNode;
      this.tail.next = null;
      return lastNode;
    }
  }
  removeFirstNode() {
    if (this.head) {
      this.length--;
      const nodeToBeRemoved = this.head;
      this.head = this.head.next;
      return nodeToBeRemoved;
    } else undefined;
  }

  insertAtIndex(value, index) {
    if (index >= this.length) throw new Error("Insert index out of bounds");

    if (index === 0) return this.prepend(value);

    let previousNode = null;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    const newNode = new Node(value, currentNode);
    previousNode.next = newNode;
    this.length++;
  }

  removeAtIndex(index) {
    if (index >= this.length) throw new Error("Remove index out of bounds");

    if (index === 0) return this.removeFirstNode();
    if (index === this.length - 1) return this.removeLastNode();

    let previousNode = this.head;
    let currentNode = this.head.next;
    for (let i = 1; i < index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    previousNode.next = currentNode.next;
    this.length--;
    return currentNode;
  }

  showListValue() {
    let currentNode = this.head;

    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

const ll = new LinkedList();

ll.append(100);
ll.append(200);
ll.append(300);
ll.prepend(400);

ll.insertAtIndex(150, 1);
ll.removeAtIndex(4);
// ll.removeFirstNode();
// ll.removeLastNode();

ll.showListValue();
console.log(ll);
