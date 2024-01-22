// This approach allows you to track views over time and sort posts based on the number of views within specific time ranges. Adjust the code according to your application's needs and requirements.

// Update Post Model:

// Add a field to your Post model to store an array of view records, each containing a timestamp.
// Update the view count when a post is viewed.
// javascript

const postSchema = new mongoose.Schema({
	// ... other fields
	views: [
		{
			timestamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

const Post = mongoose.model("Post", postSchema);

// Update Post Controller:

// Update the view count for a post when it is viewed.
// Use aggregation to filter and sort posts based on views within the desired time range.
// javascript

const today = new Date();
today.setHours(0, 0, 0, 0);

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const lastMonth = new Date(today);
lastMonth.setMonth(today.getMonth() - 1);

// Function to update view count for a post
const updatePostViews = async (postId) => {
	const post = await Post.findById(postId);

	// Update the view count
	post.views.push({ timestamp: new Date() });
	await post.save();
};

// Function to get posts based on views within a time range
const getPostsByViews = async (timeRange) => {
	const posts = await Post.aggregate([
		{
			$match: {
				// Filter based on the desired time range
				"views.timestamp": { $gte: timeRange },
			},
		},
		{
			$addFields: {
				// Calculate the number of views within the time range
				viewCount: {
					$size: {
						$filter: {
							input: "$views",
							as: "view",
							cond: { $gte: ["$$view.timestamp", timeRange] },
						},
					},
				},
			},
		},
		{ $sort: { viewCount: -1 } }, // Sort by viewCount in descending order
	]);

	return posts;
};

// Example: Update view count for a post
await updatePostViews("your_post_id");

// Example: Get posts based on views within the last week
const lastWeekPosts = await getPostsByViews(lastWeek);
