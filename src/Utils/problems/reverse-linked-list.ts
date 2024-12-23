import assert from "assert";
import { Problem } from "../types/problem";
import example from "./images/reverseLL.jpg";

class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  reverse(): LinkedList | null {
    let prev: LinkedList | null = null;
    let current: LinkedList | null = this;

    while (current !== null) {
      const next: LinkedList | null = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return prev; 
}
}

export const reverseLinkedListHandler = (fn: unknown): boolean => {
	try {
	  const functionFn = fn as (list: LinkedList) => LinkedList | null;
  
	  const tests: number[][] = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3], [1]];
	  const answers: number[][] = [[5, 4, 3, 2, 1], [1, 2, 3, 4, 5], [3, 2, 1], [1]];
  
	  for (let i = 0; i < tests.length; i++) {
		const list = createLinkedList(tests[i]);
		const result = functionFn(list);
		assert.deepEqual(getListValues(result), answers[i]);
	  }
  
	  return true;
	} catch (error: unknown) {
	  if (error instanceof Error) {
		console.log("Error from reverseLinkedListHandler: ", error.message);
		throw new Error(error.message);
	  } else {
		console.log("Unknown error: ", error);
		throw new Error("An unknown error occurred");
	  }
	}
  };
  

function createLinkedList(values: number[]): LinkedList {
  const head = new LinkedList(values[0]);
  let current = head;
  for (let i = 1; i < values.length; i++) {
    const node = new LinkedList(values[i]);
    current.next = node;
    current = node;
  }
  return head;
}

function getListValues(head: LinkedList | null): number[] {
  const values: number[] = [];
  let current: LinkedList | null = head;
  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }
  return values;
}

const starterCodeReverseLinkedListJS = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

export const reverseLinkedList: Problem = {
  id: "reverse-linked-list",
  title: "2. Reverse Linked List",
  problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
  examples: [
    {
      id: 0,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
      img: example.src,
    },
    {
      id: 1,
      inputText: "head = [1,2,3]",
      outputText: "[3,2,1]",
    },
    {
      id: 2,
      inputText: "head = [1]",
      outputText: "[1]",
    },
  ],
  constraints: `<li class='mt-2'>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000 <= Node.val <= 5000</code></li>`,
  starterCode: starterCodeReverseLinkedListJS,
  handlerFunction: reverseLinkedListHandler, 
  starterFunctionName: "function reverseLinkedList(",
  order: 2,
};
