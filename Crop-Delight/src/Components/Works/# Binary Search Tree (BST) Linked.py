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
        ""

    def dequeue(self):
        ""

    def reverse(self):
        """
        Reverse the queue.

        Parameters:
        None

        Returns:
        None
        """


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



# Stack Linked
class StackNode:
    def __init__(self, value):
        self.value = value
        self.next = None

class Stack:
    def __init__(self):
        self.top = None

    def push(self, value):


    def pop(self):


    def sort_stack(self):
        """
        Sort a stack using a temporary stack.

        Parameters:
        None

        Returns:
        None
        """
  
