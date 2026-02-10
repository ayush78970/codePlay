// tri.js - यह सही implementation होना चाहिए
export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(prefix) {
    let node = this.root;
    const results = [];
    
    // Navigate to the prefix node
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return results; // No matches
      }
      node = node.children[char];
    }
    
    // Collect all words with this prefix
    this._collectWords(node, prefix, results);
    return results;
  }

  _collectWords(node, currentWord, results) {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of Object.entries(node.children)) {
      this._collectWords(childNode, currentWord + char, results);
    }
  }
}