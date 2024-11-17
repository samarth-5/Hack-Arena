export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	companies: string[]; // Only storing icon names as strings
  };
  
  export const problems: Problem[] = [
	{
	  id: "two-sum",
	  title: "Two Sum",
	  difficulty: "Easy",
	  category: "Array",
	  order: 1,
	  companies: ["FaGoogle", "FaFacebook", "FaAmazon"],
	},
	{
	  id: "reverse-linked-list",
	  title: "Reverse Linked List",
	  difficulty: "Hard",
	  category: "Linked List",
	  order: 2,
	  companies: ["FaMicrosoft", "FaApple", "FaAmazon"],
	},
	{
	  id: "jump-game",
	  title: "Jump Game",
	  difficulty: "Medium",
	  category: "Dynamic Programming",
	  order: 3,
	  companies: ["FaGoogle", "FaFacebook", "FaAdb"],
	},
	{
	  id: "valid-parentheses",
	  title: "Valid Parentheses",
	  difficulty: "Easy",
	  category: "Stack",
	  order: 4,
	  companies: ["FaAmazon", "FaUber", "FaFacebook"],
	},
	{
	  id: "search-a-2d-matrix",
	  title: "Search a 2D Matrix",
	  difficulty: "Medium",
	  category: "Binary Search",
	  order: 5,
	  companies: ["FaMicrosoft", "FaApple", "FaLinkedin"],
	},
	{
	  id: "container-with-most-water",
	  title: "Container With Most Water",
	  difficulty: "Medium",
	  category: "Two Pointers",
	  order: 6,
	  companies: ["FaGoogle", "FaSnapchat", "FaFacebook"],
	},
	{
	  id: "merge-intervals",
	  title: "Merge Intervals",
	  difficulty: "Medium",
	  category: "Intervals",
	  order: 7,
	  companies: ["FaMicrosoft", "FaUber", "FaAmazon"],
	},
	{
	  id: "maximum-depth-of-binary-tree",
	  title: "Maximum Depth of Binary Tree",
	  difficulty: "Easy",
	  category: "Tree",
	  order: 8,
	  companies: ["FaGoogle", "FaFacebook", "FaNetflix"],
	},
	{
	  id: "best-time-to-buy-and-sell-stock",
	  title: "Best Time to Buy and Sell Stock",
	  difficulty: "Easy",
	  category: "Array",
	  order: 9,
	  companies: ["FaAmazon", "FaApple", "FaMicrosoft"],
	},
	{
	  id: "subsets",
	  title: "Subsets",
	  difficulty: "Medium",
	  category: "Backtracking",
	  order: 10,
	  companies: ["FaGoogle", "FaFacebook", "FaMicrosoft"],
	},
  ];
  