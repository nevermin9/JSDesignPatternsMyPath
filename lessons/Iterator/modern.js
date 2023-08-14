/**
 * Given the following definition of a Node , please implement preorder traversal right inside Node.
 * The sequence returned should be the sequence of values, not their containing nodes.
 */
class Node {
  constructor(value, left, right) {
    this.value = value
    this.left = left
    this.right = right
  }

  *preorder() {
    yield this.value
    if (this.left) {
      yield* this.left.preorder()
    }
    if (this.right) {
      yield* this.right.preorder()
    }
  }
}

const root = new Node(
  'A',
  new Node('B', new Node('C'), new Node('D')),
  new Node('E', new Node('F'), new Node('G'))
)

for (let value of root.preorder()) {
  console.log(value)
}
