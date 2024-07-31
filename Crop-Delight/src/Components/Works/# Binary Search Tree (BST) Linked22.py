# Binary Search Tree (BST) Linked
class TreeNode:
    def __init__(self, value=0, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def kth_smallest(root, k):
    """
    Find the k-th smallest element in a BST.

    Parameters:
    root (TreeNode): The root node of the binary search tree.
    k (int): The k-th position to find the smallest element.

    Returns:
    int: The k-th smallest element in the BST.
    """
    def inorder_traversal(node):
        return inorder_traversal(node.left) + [node.value] + inorder_traversal(node.right) if node else []
    return inorder_traversal(root)[k-1]


# Deque Linked
class Node:
    def __init__(self, value=None):
        self.value = value
        self.next = None
        self.prev = None

class Deque:
    def __init__(self):
        self.head = None
        self.tail = None

    def rotate_right(self, k):
        """
        Rotate the deque to the right by k steps.

        Parameters:
        k (int): Number of steps to rotate the deque to the right.

        Returns:
        None
        """
        if not self.head or k == 0:
            return

        # Find length of deque
        length = 1
        current = self.head
        while current.next:
            current = current.next
            length += 1

        # Connect the tail to head to make it circular
        self.tail.next = self.head
        self.head.prev = self.tail

        # Find new tail: (length - k % length - 1)th node
        new_tail_index = length - k % length - 1
        new_tail = self.head
        for _ in range(new_tail_index):
            new_tail = new_tail.next

        # Set new head and tail
        self.head = new_tail.next
        self.tail = new_tail

        # Break the circle
        self.head.prev = None
        self.tail.next = None


# Hash Set Array
class HashSet:
    def __init__(self):
        self.set = []

    def add(self, value):
        if value not in self.set:
            self.set.append(value)

    def has_common_elements(self, other_set):
        """
        Check if two sets have any elements in common.

        Parameters:
        other_set (HashSet): Another HashSet to compare with.

        Returns:
        bool: True if there are common elements, False otherwise.
        """
        for value in self.set:
            if value in other_set.set:
                return True
        return False


# List Linked
class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def reverse_k_group(head, k):
    """
    Reverse the linked list in groups of size k.

    Parameters:
    head (ListNode): The head node of the linked list.
    k (int): The size of groups to reverse.

    Returns:
    ListNode: The new head of the reversed linked list.
    """
    def reverse_linked_list(start, end):
        prev, curr = None, start
        while curr != end:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev

    dummy = ListNode(0)
    dummy.next = head
    group_prev = dummy

    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if not kth:
                return dummy.next

        group_next = kth.next
        prev, curr = group_next, group_prev.next
        for _ in range(k):
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        temp = group_prev.next
        group_prev.next = kth
        group_prev = temp


# Priority Queue (PQ) Linked
class PQNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class PriorityQueue:
    def __init__(self):
        self.head = None

    def merge(self, other_pq):
        """
        Merge two sorted priority queues.

        Parameters:
        other_pq (PriorityQueue): Another PriorityQueue to merge with.

        Returns:
        None
        """
        dummy = PQNode(0)
        current = dummy
        p1, p2 = self.head, other_pq.head

        while p1 and p2:
            if p1.value < p2.value:
                current.next = p1
                p1 = p1.next
            else:
                current.next = p2
                p2 = p2.next
            current = current.next

        current.next = p1 if p1 else p2
        self.head = dummy.next


# Queue Linked
class QueueNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None

    def enqueue(self, value):
        new_node = QueueNode(value)
        if self.rear:
            self.rear.next = new_node
        self.rear = new_node
        if not self.front:
            self.front = self.rear

    def dequeue(self):
        if not self.front:
            return None
        value = self.front.value
        self.front = self.front.next
        if not self.front:
            self.rear = None
        return value

    def reverse(self):
        """
        Reverse the queue.

        Parameters:
        None

        Returns:
        None
        """
        prev, curr = None, self.front
        self.rear = self.front
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        self.front = prev


# Sorted List Linked
class SortedListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def insert_sorted(head, value):
    """
    Insert a node in a sorted linked list.

    Parameters:
    head (SortedListNode): The head node of the sorted linked list.
    value (int): The value to insert.

    Returns:
    SortedListNode: The head of the linked list after insertion.
    """
    new_node = SortedListNode(value)
    if not head or head.value >= value:
        new_node.next = head
        return new_node

    current = head
    while current.next and current.next.value < value:
        current = current.next

    new_node.next = current.next
    current.next = new_node
    return head


# Stack Linked
class StackNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class Stack:
    def __init__(self):
        self.top = None

    def push(self, value):
        new_node = StackNode(value)
        new_node.next = self.top
        self.top = new_node

    def pop(self):
        if not self.top:
            return None
        value = self.top.value
        self.top = self.top.next
        return value

    def sort_stack(self):
        """
        Sort a stack using a temporary stack.

        Parameters:
        None

        Returns:
        None
        """
        temp_stack = Stack()
        while self.top:
            temp = self.pop()
            while temp_stack.top and temp_stack.top.value > temp:
                self.push(temp_stack.pop())
            temp_stack.push(temp)

        while temp_stack.top:
            self.push(temp_stack.pop())
