export const quizData = {
  Array: [
    {
      question: "Which data structure stores data in contiguous memory?",
      options: ["Linked List", "Array", "Tree", "Graph"],
      answer: "Array"
    },
    {
      question: "What is the time complexity to access an element in an array by index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)"
    },
    {
      question: "Which of the following is NOT an advantage of arrays?",
      options: ["Fast access", "Contiguous memory", "Fixed size", "Easy traversal"],
      answer: "Fixed size"
    },
    {
      question: "What is the index of the first element in an array?",
      options: ["1", "0", "-1", "Depends on language"],
      answer: "0"
    },
    {
      question: "Which searching algorithm works efficiently on sorted arrays?",
      options: ["Linear Search", "Binary Search", "DFS", "BFS"],
      answer: "Binary Search"
    }
  ],

  LinkedList: [
    {
      question: "Which linked list supports two-way traversal?",
      options: ["Singly", "Doubly", "Circular", "Static"],
      answer: "Doubly"
    },
    {
      question: "What is the time complexity for insertion at the beginning of a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)"
    },
    {
      question: "What does each node in a singly linked list contain?",
      options: ["Data only", "Data and one pointer", "Two pointers", "Three pointers"],
      answer: "Data and one pointer"
    },
    {
      question: "Which linked list connects the last node back to the first?",
      options: ["Singly", "Circular", "Doubly", "Static"],
      answer: "Circular"
    },
    {
      question: "Which operation is slowest in a linked list compared to arrays?",
      options: ["Insertion", "Deletion", "Traversal", "Access by index"],
      answer: "Access by index"
    }
  ],

  Graph: [
    {
      question: "Which traversal uses a queue?",
      options: ["DFS", "BFS", "Inorder", "Preorder"],
      answer: "BFS"
    },
    {
      question: "A graph with no cycles is called:",
      options: ["Tree", "Cyclic Graph", "Complete Graph", "Bipartite Graph"],
      answer: "Tree"
    },
    {
      question: "What does BFS stand for?",
      options: ["Binary First Search", "Breadth First Search", "Best First Search", "Branch First Search"],
      answer: "Breadth First Search"
    },
    {
      question: "Which data structure is used for DFS?",
      options: ["Queue", "Stack", "Heap", "Linked List"],
      answer: "Stack"
    },
    {
      question: "Minimum edges in a connected graph with N nodes is:",
      options: ["N", "N-1", "2N", "0"],
      answer: "N-1"
    }
  ],

  Tree: [
    {
      question: "Which traversal is Left-Root-Right?",
      options: ["Inorder", "Preorder", "Postorder", "Level Order"],
      answer: "Inorder"
    },
    {
      question: "A tree with all levels completely filled is called:",
      options: ["Full Binary Tree", "Complete Binary Tree", "Skewed Tree", "AVL Tree"],
      answer: "Complete Binary Tree"
    },
    {
      question: "Height of a single-node tree is:",
      options: ["-1", "0", "1", "2"],
      answer: "0"
    },
    {
      question: "Which tree is height-balanced?",
      options: ["Binary Tree", "AVL Tree", "BST", "Red-Black Tree"],
      answer: "AVL Tree"
    },
    {
      question: "In a binary search tree (BST), where are smaller values stored?",
      options: ["Right child", "Left child", "Root", "Leaf nodes"],
      answer: "Left child"
    }
  ]
};
