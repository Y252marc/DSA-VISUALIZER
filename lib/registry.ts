// ============================================================================
// DSA Visualizer — Algorithm Registry
// Single source of truth for all algorithm metadata
// ============================================================================

export type AlgoItem = {
    id: string;
    title: string;
    category: string;
    status: "active" | "blueprint";
    complexity: { time: string; space: string };
    description: string;
};

// ---------------------------------------------------------------------------
// THE REGISTRY — 80+ algorithms across 10 categories
// ---------------------------------------------------------------------------

export const REGISTRY: AlgoItem[] = [
    // ==========================================================================
    // SORTING (12)
    // ==========================================================================
    {
        id: "bubble-sort",
        title: "Bubble Sort",
        category: "Sorting",
        status: "active",
        complexity: { time: "O(n²)", space: "O(1)" },
        description:
            "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Named for the way smaller elements 'bubble' to the top of the list. While simple to understand, it is inefficient for large datasets.",
    },
    {
        id: "selection-sort",
        title: "Selection Sort",
        category: "Sorting",
        status: "active",
        complexity: { time: "O(n²)", space: "O(1)" },
        description:
            "Divides the input list into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region. Performs fewer swaps than Bubble Sort but has the same time complexity.",
    },
    {
        id: "insertion-sort",
        title: "Insertion Sort",
        category: "Sorting",
        status: "active",
        complexity: { time: "O(n²)", space: "O(1)" },
        description:
            "Builds the sorted array one item at a time by repeatedly picking the next item and inserting it into the correct position among the previously sorted items. Efficient for small or nearly-sorted datasets. Serves as the base case for hybrid sorts like TimSort.",
    },
    {
        id: "merge-sort",
        title: "Merge Sort",
        category: "Sorting",
        status: "active",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, and then merges the two sorted halves. Guarantees O(n log n) performance regardless of input. Stable sort widely used in practice, including as the default in many standard libraries.",
    },
    {
        id: "quick-sort",
        title: "Quick Sort",
        category: "Sorting",
        status: "active",
        complexity: { time: "O(n log n) avg", space: "O(log n)" },
        description:
            "Selects a 'pivot' element and partitions the array around it so that elements less than the pivot come before it and elements greater come after. Recursively sorts the sub-arrays. Average-case O(n log n) with excellent cache performance despite O(n²) worst case.",
    },
    {
        id: "heap-sort",
        title: "Heap Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(1)" },
        description:
            "Builds a max-heap from the array and repeatedly extracts the maximum element to build the sorted sequence from the end. Guarantees O(n log n) with O(1) auxiliary space. Not stable but useful when guaranteed performance and minimal memory are required.",
    },
    {
        id: "radix-sort",
        title: "Radix Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(nk)", space: "O(n + k)" },
        description:
            "Non-comparative sorting algorithm that distributes elements into buckets based on individual digits or characters. Processes from least significant to most significant digit (LSD) or vice versa (MSD). Achieves linear time when the key size k is constant.",
    },
    {
        id: "counting-sort",
        title: "Counting Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n + k)", space: "O(k)" },
        description:
            "Counts the number of objects with distinct key values, then uses arithmetic to determine positions. Works only with non-negative integers within a known range k. Stable and linear time, often used as a subroutine in Radix Sort.",
    },
    {
        id: "bucket-sort",
        title: "Bucket Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n + k) avg", space: "O(n)" },
        description:
            "Distributes elements into a number of buckets. Each bucket is then sorted individually using another algorithm or recursively. Assumes uniform distribution over a range. Average-case linear time when elements are uniformly distributed.",
    },
    {
        id: "shell-sort",
        title: "Shell Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n log² n)", space: "O(1)" },
        description:
            "A generalization of insertion sort that starts by sorting pairs of elements far apart and progressively reduces the gap. The gap sequence determines the time complexity. Faster than insertion sort for larger lists while remaining simple to implement.",
    },
    {
        id: "tim-sort",
        title: "Tim Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "A hybrid stable sorting algorithm derived from merge sort and insertion sort. Identifies naturally occurring sorted subsequences (runs) and merges them efficiently. Default sort in Python, Java, and many modern language runtimes.",
    },
    {
        id: "cocktail-shaker-sort",
        title: "Cocktail Shaker Sort",
        category: "Sorting",
        status: "blueprint",
        complexity: { time: "O(n²)", space: "O(1)" },
        description:
            "A bidirectional variant of Bubble Sort that traverses the list in both directions alternately. Each pass moves the largest unsorted element to the end and the smallest unsorted element to the beginning. Slightly better than Bubble Sort for certain nearly-sorted inputs.",
    },

    // ==========================================================================
    // SEARCHING (6)
    // ==========================================================================
    {
        id: "linear-search",
        title: "Linear Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Sequentially checks each element in the list until a match is found or the entire list has been searched. The simplest search algorithm with no prerequisites on data ordering. Optimal for unsorted or small datasets.",
    },
    {
        id: "binary-search",
        title: "Binary Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(log n)", space: "O(1)" },
        description:
            "Efficiently finds a target value within a sorted array by repeatedly dividing the search interval in half. Compares the target to the middle element and eliminates half of the remaining elements at each step. Foundation for many algorithmic techniques.",
    },
    {
        id: "jump-search",
        title: "Jump Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(√n)", space: "O(1)" },
        description:
            "Works on sorted arrays by jumping ahead by fixed steps of size √n and then performing a linear search within the identified block. Optimal step size is √n. Fewer comparisons than linear search but more than binary search.",
    },
    {
        id: "interpolation-search",
        title: "Interpolation Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(log log n) avg", space: "O(1)" },
        description:
            "An improved variant of binary search for uniformly distributed sorted data. Estimates the position of the target based on the value of the search key relative to the range of values. Outperforms binary search when data is uniformly distributed.",
    },
    {
        id: "exponential-search",
        title: "Exponential Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(log n)", space: "O(1)" },
        description:
            "Finds the range where the element may be present by exponentially increasing the index, then performs binary search within that range. Particularly useful for unbounded or infinite-sized sorted arrays.",
    },
    {
        id: "ternary-search",
        title: "Ternary Search",
        category: "Searching",
        status: "blueprint",
        complexity: { time: "O(log₃ n)", space: "O(1)" },
        description:
            "Divides the sorted array into three parts and determines which part the key lies in, reducing the search space by one-third. Primarily used for finding the maximum or minimum of unimodal functions rather than general searching.",
    },

    // ==========================================================================
    // ARRAYS (8)
    // ==========================================================================
    {
        id: "two-sum",
        title: "Two Sum",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "Given an array of integers and a target sum, find two numbers that add up to the target. The hash map approach achieves O(n) time by storing complements. A foundational problem that introduces the concept of trading space for time.",
    },
    {
        id: "kadanes-algorithm",
        title: "Kadane's Algorithm",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Finds the maximum sum contiguous subarray in O(n) time using dynamic programming. Maintains a running sum, resetting when it becomes negative. Elegant example of converting a brute-force O(n³) problem into a linear-time solution.",
    },
    {
        id: "sliding-window",
        title: "Sliding Window",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "A technique for processing sequential data by maintaining a window that slides over the array. Converts nested-loop problems into single-pass solutions. Used for substring problems, maximum subarray of size k, and stream processing.",
    },
    {
        id: "prefix-sum",
        title: "Prefix Sum",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n) build / O(1) query", space: "O(n)" },
        description:
            "Precomputes cumulative sums so that any subarray sum can be queried in O(1) time. The prefix sum array stores the running total at each index. Fundamental technique for range-query problems and 2D matrix sum queries.",
    },
    {
        id: "dutch-national-flag",
        title: "Dutch National Flag",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Three-way partitioning algorithm by Dijkstra that sorts an array containing three distinct values in a single pass. Uses three pointers (low, mid, high) to partition elements. Applied in Quick Sort's three-way partition variant.",
    },
    {
        id: "rotate-array",
        title: "Rotate Array",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Rotates an array by k positions using the reversal algorithm: reverse the entire array, reverse the first k elements, then reverse the remaining elements. Achieves O(n) time with O(1) extra space through elegant pointer manipulation.",
    },
    {
        id: "merge-intervals",
        title: "Merge Intervals",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "Given a collection of intervals, merge all overlapping intervals. Sort by start time, then linearly scan and merge overlapping ones. Common in scheduling, genomics, and calendar applications.",
    },
    {
        id: "next-permutation",
        title: "Next Permutation",
        category: "Arrays",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Rearranges the array into the lexicographically next greater permutation. Finds the rightmost ascent, swaps with the smallest larger element to its right, then reverses the suffix. Foundation for combinatorial enumeration.",
    },

    // ==========================================================================
    // LINKED LISTS (7)
    // ==========================================================================
    {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Reverses a singly linked list iteratively by maintaining three pointers (prev, curr, next) and re-linking each node. Fundamental operation that tests understanding of pointer manipulation. Can also be done recursively with O(n) stack space.",
    },
    {
        id: "detect-cycle",
        title: "Detect Cycle (Floyd's)",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Floyd's Tortoise and Hare algorithm uses two pointers moving at different speeds to detect a cycle in a linked list. If a cycle exists the fast pointer will eventually meet the slow pointer. Also used to find the cycle's starting node.",
    },
    {
        id: "merge-sorted-lists",
        title: "Merge Two Sorted Lists",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n + m)", space: "O(1)" },
        description:
            "Merges two sorted linked lists into one sorted list by comparing head nodes and stitching them together. Uses a dummy head for cleaner code. Building block for merge sort on linked lists and k-way merge problems.",
    },
    {
        id: "remove-nth-from-end",
        title: "Remove Nth From End",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Removes the nth node from the end of a linked list in one pass using the two-pointer technique. The first pointer advances n steps ahead, then both move together until the first reaches the end. Demonstrates the gap-pointer strategy.",
    },
    {
        id: "lru-cache",
        title: "LRU Cache",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(1) get/put", space: "O(capacity)" },
        description:
            "Implements a Least Recently Used cache using a doubly linked list and hash map. The doubly linked list maintains access order while the hash map provides O(1) lookup. Evicts the least recently used entry when the cache is full.",
    },
    {
        id: "flatten-multilevel-list",
        title: "Flatten Multilevel List",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Flattens a multilevel doubly linked list where nodes may have child pointers that lead to sublists. Iteratively or recursively integrates child lists into the main list. Tests deep understanding of pointer re-wiring in complex structures.",
    },
    {
        id: "clone-random-pointer",
        title: "Clone with Random Pointer",
        category: "Linked Lists",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Deep copies a linked list where each node has an additional random pointer to any node or null. The O(1) space approach interleaves cloned nodes with originals, sets random pointers, then separates the two lists.",
    },

    // ==========================================================================
    // STACKS & QUEUES (6)
    // ==========================================================================
    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "Determines if a string of brackets is valid by using a stack. Push opening brackets onto the stack and pop when a matching closer is found. If the stack is empty at the end, the string is valid. Foundational stack application.",
    },
    {
        id: "min-stack",
        title: "Min Stack",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(1) all ops", space: "O(n)" },
        description:
            "A stack data structure that supports push, pop, top, and retrieving the minimum element, all in O(1) time. Uses an auxiliary stack that tracks the current minimum at each level. Demonstrates augmenting data structures for constant-time queries.",
    },
    {
        id: "next-greater-element",
        title: "Next Greater Element",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "For each element in an array, finds the next element that is greater. Uses a monotonic decreasing stack to process elements right-to-left (or left-to-right). Key pattern for stock span, daily temperatures, and histogram problems.",
    },
    {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(k)" },
        description:
            "Finds the maximum value in every window of size k as it slides across the array. Uses a monotonic deque (double-ended queue) that maintains elements in decreasing order. Each element is enqueued and dequeued at most once.",
    },
    {
        id: "queue-using-stacks",
        title: "Implement Queue using Stacks",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(1) amortized", space: "O(n)" },
        description:
            "Implements a FIFO queue using two LIFO stacks. Elements are pushed to an input stack and moved to an output stack (reversing order) when a dequeue is needed. Amortized O(1) per operation. Classic data structure transformation problem.",
    },
    {
        id: "evaluate-rpn",
        title: "Evaluate Reverse Polish Notation",
        category: "Stacks & Queues",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "Evaluates an arithmetic expression in Reverse Polish Notation (postfix). Operands are pushed to a stack; when an operator is encountered, operands are popped, the operation is applied, and the result is pushed back. Eliminates the need for parentheses.",
    },

    // ==========================================================================
    // TREES (10)
    // ==========================================================================
    {
        id: "inorder-traversal",
        title: "Inorder Traversal",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(h)" },
        description:
            "Visits nodes in Left → Root → Right order. For binary search trees, inorder traversal produces elements in sorted order. Can be implemented recursively or iteratively using a stack. The Morris traversal variant achieves O(1) space.",
    },
    {
        id: "preorder-traversal",
        title: "Preorder Traversal",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(h)" },
        description:
            "Visits nodes in Root → Left → Right order. Used to create a copy of the tree, generate prefix expressions, and serialize tree structures. The first node visited is always the root, making it useful for top-down processing.",
    },
    {
        id: "postorder-traversal",
        title: "Postorder Traversal",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(h)" },
        description:
            "Visits nodes in Left → Right → Root order. Used for tree deletion, postfix expression evaluation, and bottom-up computations where children must be processed before their parent. Iterative implementation requires careful stack handling.",
    },
    {
        id: "level-order-traversal",
        title: "Level Order Traversal (BFS)",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(w)" },
        description:
            "Visits nodes level by level, from left to right, using a queue. Produces a breadth-first view of the tree. Width w can be up to n/2 for complete binary trees. Foundation for finding tree width, zigzag traversal, and shortest path in unweighted trees.",
    },
    {
        id: "bst-insert-search",
        title: "BST Insert & Search",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(h)", space: "O(1)" },
        description:
            "Insertion places a new key in the correct position maintaining the BST property (left < root < right). Search follows the same path to locate a key. Both operations are O(h) where h is the tree height, O(log n) for balanced trees.",
    },
    {
        id: "avl-rotation",
        title: "AVL Tree Rotation",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(log n)", space: "O(1)" },
        description:
            "Self-balancing BST that maintains the invariant that the height difference (balance factor) between left and right subtrees is at most 1. Uses four rotation types (LL, RR, LR, RL) to restore balance after insertions and deletions.",
    },
    {
        id: "lowest-common-ancestor",
        title: "Lowest Common Ancestor",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(h)" },
        description:
            "Finds the lowest (deepest) node that is an ancestor of two given nodes. For BSTs, comparisons with the root determine which subtree to explore. For general binary trees, recursive post-order traversal checks both subtrees and returns the first shared ancestor.",
    },
    {
        id: "diameter-of-tree",
        title: "Diameter of Binary Tree",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(h)" },
        description:
            "The diameter is the length of the longest path between any two nodes. Computed using a post-order traversal that tracks the maximum depth of each subtree. The diameter at each node is the sum of left and right depths. Global maximum is tracked.",
    },
    {
        id: "serialize-deserialize-tree",
        title: "Serialize & Deserialize Tree",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "Converts a binary tree to a string representation and reconstructs it. Uses preorder traversal with null markers for missing children. Essential for transmitting tree data over networks, saving to disk, or caching tree structures.",
    },
    {
        id: "segment-tree",
        title: "Segment Tree",
        category: "Trees",
        status: "blueprint",
        complexity: { time: "O(log n) query/update", space: "O(n)" },
        description:
            "A tree data structure for efficient range queries (sum, min, max) and point updates on an array. Each node represents a range. Queries and updates take O(log n). Supports lazy propagation for range updates. Fundamental for competitive programming.",
    },

    // ==========================================================================
    // GRAPHS (10)
    // ==========================================================================
    {
        id: "bfs-graph",
        title: "Breadth-First Search (Graph)",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(V + E)", space: "O(V)" },
        description:
            "Explores a graph level by level using a queue. Visits all neighbors of a node before moving to the next level. Finds the shortest path in unweighted graphs. Used for connected components, bipartiteness checking, and level-based problems.",
    },
    {
        id: "dfs-graph",
        title: "Depth-First Search (Graph)",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(V + E)", space: "O(V)" },
        description:
            "Explores a graph by going as deep as possible along each branch before backtracking. Uses a stack (or recursion). Foundation for topological sorting, cycle detection, connected components, and path finding in mazes.",
    },
    {
        id: "dijkstra",
        title: "Dijkstra's Algorithm",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O((V + E) log V)", space: "O(V)" },
        description:
            "Finds the shortest path from a source vertex to all other vertices in a graph with non-negative edge weights. Uses a priority queue (min-heap) to greedily select the closest unvisited vertex. Foundation of GPS routing and network optimization.",
    },
    {
        id: "bellman-ford",
        title: "Bellman-Ford Algorithm",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(VE)", space: "O(V)" },
        description:
            "Computes shortest paths from a single source vertex, handling negative edge weights (unlike Dijkstra). Relaxes all edges V-1 times. Can detect negative weight cycles by checking for further relaxation on the Vth pass.",
    },
    {
        id: "floyd-warshall",
        title: "Floyd-Warshall Algorithm",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(V³)", space: "O(V²)" },
        description:
            "Finds shortest paths between all pairs of vertices using dynamic programming. Builds a distance matrix where each entry (i,j) represents the shortest path from i to j. Handles negative edges but not negative cycles.",
    },
    {
        id: "kruskal",
        title: "Kruskal's Algorithm",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(E log E)", space: "O(V)" },
        description:
            "Finds the minimum spanning tree by sorting all edges by weight and adding them one by one if they don't create a cycle. Uses Union-Find (disjoint set) for efficient cycle detection. Greedy algorithm optimal for sparse graphs.",
    },
    {
        id: "prim",
        title: "Prim's Algorithm",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O((V + E) log V)", space: "O(V)" },
        description:
            "Builds the minimum spanning tree by starting from an arbitrary vertex and repeatedly adding the cheapest edge connecting the tree to an outside vertex. Uses a priority queue. More efficient than Kruskal for dense graphs.",
    },
    {
        id: "topological-sort",
        title: "Topological Sort",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(V + E)", space: "O(V)" },
        description:
            "Linear ordering of vertices in a directed acyclic graph (DAG) such that for every edge (u,v), u comes before v. Implemented via DFS (reverse post-order) or Kahn's algorithm (BFS with in-degree tracking). Used for dependency resolution and build systems.",
    },
    {
        id: "tarjan-scc",
        title: "Tarjan's SCC",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(V + E)", space: "O(V)" },
        description:
            "Finds all strongly connected components in a directed graph using a single DFS pass. Maintains a stack and discovery/low-link values. A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex.",
    },
    {
        id: "a-star-search",
        title: "A* Search",
        category: "Graphs",
        status: "blueprint",
        complexity: { time: "O(E)", space: "O(V)" },
        description:
            "An informed search algorithm that finds the shortest path using a heuristic function to estimate the cost to the goal. Combines Dijkstra's algorithm with greedy best-first search. Optimal when the heuristic is admissible (never overestimates). Standard for pathfinding in games and robotics.",
    },

    // ==========================================================================
    // DYNAMIC PROGRAMMING (10)
    // ==========================================================================
    {
        id: "fibonacci-dp",
        title: "Fibonacci (DP)",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(1)" },
        description:
            "Computes the nth Fibonacci number using dynamic programming instead of naive recursion. Bottom-up tabulation reduces O(2^n) to O(n). Space can be optimized to O(1) by keeping only the last two values. Canonical introduction to DP concepts.",
    },
    {
        id: "knapsack-01",
        title: "0/1 Knapsack",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(nW)", space: "O(nW)" },
        description:
            "Given items with weights and values, determine the maximum value that can fit in a knapsack of capacity W, where each item can be taken at most once. Pseudo-polynomial time solution using a 2D DP table. Foundation for resource allocation problems.",
    },
    {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(mn)", space: "O(mn)" },
        description:
            "Finds the longest subsequence present in both strings. Uses a 2D DP table where dp[i][j] represents the LCS length of prefixes of length i and j. Backtracking through the table recovers the actual subsequence. Used in diff tools and bioinformatics.",
    },
    {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "Finds the length of the longest strictly increasing subsequence. The O(n²) DP approach can be optimized to O(n log n) using patience sorting with binary search. Applications include envelopes nesting, box stacking, and sequence analysis.",
    },
    {
        id: "coin-change",
        title: "Coin Change",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n × amount)", space: "O(amount)" },
        description:
            "Given coin denominations and a target amount, find the minimum number of coins needed. Uses bottom-up DP where dp[i] stores the minimum coins for amount i. Unbounded variant of the knapsack problem. Classic DP interview question.",
    },
    {
        id: "edit-distance",
        title: "Edit Distance (Levenshtein)",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(mn)", space: "O(mn)" },
        description:
            "Computes the minimum number of operations (insert, delete, replace) to transform one string into another. Uses a 2D DP table. Applications include spell checking, DNA sequence alignment, and natural language processing.",
    },
    {
        id: "matrix-chain-multiplication",
        title: "Matrix Chain Multiplication",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n³)", space: "O(n²)" },
        description:
            "Determines the most efficient way to multiply a chain of matrices by finding the optimal parenthesization. The order of multiplication doesn't change the result but dramatically affects the number of scalar multiplications. Classic interval DP problem.",
    },
    {
        id: "rod-cutting",
        title: "Rod Cutting",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n²)", space: "O(n)" },
        description:
            "Given a rod of length n and a table of prices for pieces of length 1 through n, determine the maximum revenue obtainable by cutting and selling the pieces. Unbounded knapsack variant. Demonstrates the DP paradigm of optimal substructure and overlapping subproblems.",
    },
    {
        id: "egg-drop",
        title: "Egg Drop Problem",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n × k × log n)", space: "O(nk)" },
        description:
            "With k eggs and n floors, determine the minimum number of trials needed to find the critical floor from which an egg breaks. Binary search optimization reduces the inner loop. Demonstrates the trade-off between worst-case and expected-case strategies.",
    },
    {
        id: "palindrome-partitioning",
        title: "Palindrome Partitioning",
        category: "Dynamic Programming",
        status: "blueprint",
        complexity: { time: "O(n²)", space: "O(n²)" },
        description:
            "Finds the minimum number of cuts needed to partition a string so that every substring is a palindrome. Precomputes palindrome checks with a 2D boolean table, then computes minimum cuts using a 1D DP array. Interval DP variant.",
    },

    // ==========================================================================
    // BACKTRACKING (6)
    // ==========================================================================
    {
        id: "n-queens",
        title: "N-Queens Problem",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(N!)", space: "O(N²)" },
        description:
            "Places N queens on an N×N chessboard so that no two queens threaten each other. Uses backtracking to explore placements row by row, pruning invalid positions immediately. Classic constraint satisfaction problem demonstrating exhaustive search with pruning.",
    },
    {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(9^(n²))", space: "O(n²)" },
        description:
            "Fills a 9×9 grid so that each row, column, and 3×3 box contains digits 1-9 with no repeats. Tries each number in each cell and backtracks when a conflict is detected. Constraint propagation can dramatically prune the search space.",
    },
    {
        id: "rat-in-maze",
        title: "Rat in a Maze",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(2^(n²))", space: "O(n²)" },
        description:
            "Find all paths from the top-left to bottom-right of a maze where the rat can move in four directions. Marks cells as visited, explores all directions, and backtracks when stuck. Demonstrates path-finding through exhaustive exploration.",
    },
    {
        id: "word-search",
        title: "Word Search",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(N × 3^L)", space: "O(L)" },
        description:
            "Given a 2D board and a word, determine if the word exists in the grid by moving to adjacent cells. Each cell can be used once per word. Backtracks when the current path cannot form the word. DFS with visited tracking.",
    },
    {
        id: "subset-sum",
        title: "Subset Sum",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(2^n)", space: "O(n)" },
        description:
            "Determines whether any subset of a set of integers sums to a given target. Explores inclusion/exclusion at each element. Can be optimized with DP for pseudo-polynomial time. Bridges backtracking and dynamic programming approaches.",
    },
    {
        id: "hamiltonian-path",
        title: "Hamiltonian Path",
        category: "Backtracking",
        status: "blueprint",
        complexity: { time: "O(N!)", space: "O(N)" },
        description:
            "Finds a path in a graph that visits every vertex exactly once. NP-complete problem solved by trying all permutations with pruning. A Hamiltonian Cycle additionally requires returning to the starting vertex. Used in routing and scheduling.",
    },

    // ==========================================================================
    // GREEDY (5)
    // ==========================================================================
    {
        id: "activity-selection",
        title: "Activity Selection",
        category: "Greedy",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(1)" },
        description:
            "Selects the maximum number of non-overlapping activities from a set with start and end times. Sort by finish time, greedily select the earliest-finishing activity that doesn't conflict. Classic proof of greedy optimality via exchange argument.",
    },
    {
        id: "huffman-coding",
        title: "Huffman Coding",
        category: "Greedy",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "A lossless data compression algorithm that assigns variable-length codes to characters based on frequency. Builds a binary tree using a priority queue, where frequent characters get shorter codes. Optimal prefix-free encoding.",
    },
    {
        id: "fractional-knapsack",
        title: "Fractional Knapsack",
        category: "Greedy",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(1)" },
        description:
            "Unlike 0/1 Knapsack, items can be broken into fractions. Sort by value-to-weight ratio and greedily take the highest ratio items. Provably optimal because the greedy choice property holds for continuous quantities.",
    },
    {
        id: "job-sequencing",
        title: "Job Sequencing with Deadlines",
        category: "Greedy",
        status: "blueprint",
        complexity: { time: "O(n²)", space: "O(n)" },
        description:
            "Schedule jobs on a single machine to maximize total profit, where each job has a deadline and profit. Sort by profit (descending) and assign each job to the latest available slot before its deadline. Demonstrates greedy scheduling.",
    },
    {
        id: "optimal-merge-pattern",
        title: "Optimal Merge Pattern",
        category: "Greedy",
        status: "blueprint",
        complexity: { time: "O(n log n)", space: "O(n)" },
        description:
            "Minimizes the total cost of merging n sorted files into one. Uses a min-heap to repeatedly merge the two smallest files. The cost of each merge is the sum of the two file sizes. Greedy approach produces the optimal merge tree.",
    },

    // ==========================================================================
    // HASHING (5)
    // ==========================================================================
    {
        id: "hash-table-chaining",
        title: "Hash Table (Chaining)",
        category: "Hashing",
        status: "blueprint",
        complexity: { time: "O(1) avg", space: "O(n)" },
        description:
            "Implements a hash table using separate chaining for collision resolution. Each bucket contains a linked list of entries. Load factor determines when to resize. Foundation for dictionaries, sets, and caches in every major language.",
    },
    {
        id: "hash-table-open-addressing",
        title: "Hash Table (Open Addressing)",
        category: "Hashing",
        status: "blueprint",
        complexity: { time: "O(1) avg", space: "O(n)" },
        description:
            "Handles collisions by probing for the next available slot within the table itself. Variants include linear probing, quadratic probing, and double hashing. Better cache performance than chaining but suffers from clustering.",
    },
    {
        id: "rabin-karp",
        title: "Rabin-Karp Algorithm",
        category: "Hashing",
        status: "blueprint",
        complexity: { time: "O(n + m) avg", space: "O(1)" },
        description:
            "String matching algorithm that uses rolling hash to find pattern occurrences in text. Computes hash of pattern and slides a window over the text, updating the hash in O(1). Efficient for multiple pattern search.",
    },
    {
        id: "count-distinct-elements",
        title: "Count Distinct Elements",
        category: "Hashing",
        status: "blueprint",
        complexity: { time: "O(n)", space: "O(n)" },
        description:
            "Counts the number of unique elements in an array using a hash set. Each element is inserted into the set, and duplicates are automatically handled. Reduces O(n log n) sorting approach to O(n) average time.",
    },
    {
        id: "group-anagrams",
        title: "Group Anagrams",
        category: "Hashing",
        status: "blueprint",
        complexity: { time: "O(n × k)", space: "O(n × k)" },
        description:
            "Groups strings that are anagrams of each other. Uses a hash map where keys are sorted character strings or character frequency counts. Demonstrates effective hash key design for equivalence class grouping.",
    },
];

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

export function getAlgoById(id: string): AlgoItem | undefined {
    return REGISTRY.find((algo) => algo.id === id);
}

export function getAlgosByCategory(category: string): AlgoItem[] {
    return REGISTRY.filter((algo) => algo.category === category);
}

export function getCategories(): string[] {
    const cats = new Set(REGISTRY.map((algo) => algo.category));
    return Array.from(cats);
}

export function searchAlgos(query: string): AlgoItem[] {
    const lower = query.toLowerCase();
    return REGISTRY.filter(
        (algo) =>
            algo.title.toLowerCase().includes(lower) ||
            algo.category.toLowerCase().includes(lower) ||
            algo.id.toLowerCase().includes(lower)
    );
}
