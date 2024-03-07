import { Deal } from "../models/deal.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//--------------------------------  ADD VIEW ------------------------------

export const addView = asyncHandler(async (req, res, next) => {
	const { type, slug } = req.body;

	if (!type || !slug) {
		return res.status(400).json(new ApiResponse(400, "Invalid Request", null));
	}

	const Model = type === "deal" ? Deal : Post;

	// const addView = await Model.findByIdAndUpdate(docId, {
	// 	$inc: { views: 1 },
	// });

	const addView = await Model.findOneAndUpdate(
		{ slug: slug },
		{ $inc: { views: 1 } }
	);

	return res
		.status(200)
		.json(new ApiResponse(200, "View Added Successfully", addView));
});

//--------------------------------  get deal save & vote status ------------------------------

export const getDealStatus = asyncHandler(async (req, res, next) => {
	const { slug } = req.body;

	//get views & upvotes

	const result = {
		voteStatus: null,
		saveStatus: null,
	};

	const doc = await Deal.findOne({ slug: slug }).select("_id");

	if (!doc)
		return res.status(404).json(new ApiResponse(404, "Deal not found", null));

	// get upvotes type

	const upVotes = req.user.votedDeals.filter((vote) => vote.dealId === doc._id);

	if (upVotes.length > 0) result.voteStatus = upVotes[0].voteType;

	//is Saved

	const isSaved = req.user.savedDeals.filter((deal) => deal === doc._id);

	if (isSaved.length > 0) result.saveStatus = true;

	return res.status(200).json(new ApiResponse(200, "Action Status", result));
});

//--------------------------------  ADD VOTE TO DEAL ------------------------------

export const addVote = asyncHandler(async (req, res) => {
	const { dealId, voteType } = req.body;

	if (!dealId || !voteType) {
		return res.status(400).json(new ApiResponse(400, "Invalid Request", null));
	}

	// Check if the document exists
	const deal = await Deal.findById(dealId);
	if (!deal) {
		return res
			.status(404)
			.json(new ApiResponse(404, "Deal/Offer not found", null));
	}

	// Check if the user has already voted the same way
	const currentUser = await User.findById(req.user._id);
	const existingVote = currentUser.votedDeals.find(
		(vote) => vote.dealId.toString() === dealId && vote.voteType === voteType
	);
	if (existingVote) {
		return res
			.status(200)
			.json(new ApiResponse(400, "You have already voted this way", null));
	}

	// Remove the user's old vote if it exists
	await User.updateOne(
		{ _id: req.user._id, "votedDeals.dealId": dealId },
		{ $pull: { votedDeals: { dealId: dealId } } }
	);

	// Add the new vote
	await User.updateOne(
		{ _id: req.user._id },
		{ $push: { votedDeals: { dealId, voteType } } }
	);

	// Update the vote count
	const update =
		voteType === "up" ? { $inc: { upVotes: 1 } } : { $inc: { upVotes: -1 } };
	const updatedDoc = await Deal.findByIdAndUpdate(dealId, update, { new: true });

	const voteCount = updatedDoc.upVotes;
	const currentVoteStatus = voteType;

	return res.status(200).json(
		new ApiResponse(200, "Vote Added Successfully", {
			voteCount,
			voteType: currentVoteStatus,
		})
	);
});

//--------------------------------  GET CURRENT USERS VOTE STATUS ------------------------------

// ---------------------- SAVE Deal ----------------------

export const saveDeal = asyncHandler(async (req, res, next) => {
	const { dealId } = req.body;

	console.log("dealId from save deal action");
	console.log(dealId);

	if (!dealId) {
		return res.status(400).json(new ApiResponse(400, "Invalid Request", null));
	}

	try {
		//check if deal is already saved

		const alreadyUser = await User.findOne({
			_id: req.user._id,
			savedDeals: { $in: [dealId] },
		});

		// if deal is already saved removed the deal from savedDeals

		if (alreadyUser) {
			const user = await User.findByIdAndUpdate(
				req.user._id,
				{ $pull: { savedDeals: dealId } },
				{ new: true }
			);

			return res.status(200).json(new ApiResponse(200, "🗑️ Deal UnSaved", false));
		}

		//current user find and update savedDeals

		const user = await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet: { savedDeals: dealId } },
			{ new: true }
		);

		return res.status(200).json(new ApiResponse(200, "✅ Deal Saved", true));
	} catch (error) {
		console.log(error.message);

		return res
			.status(500)
			.json(new ApiResponse(500, "Internal Server Error", error.message));
	}
});

// ---------------------- DEAL Link ----------------------

export const dealLink = asyncHandler(async (req, res, next) => {
	const { dealId } = req.body;

	if (!dealId) {
		return res.status(400).json(new ApiResponse(400, "Invalid Request", null));
	}

	const deal = await Deal.findById(dealId)
		.select(
			"_id slug link linkCount affiliateLink affiliateLinkCount linkClickHistory store user"
		)
		.populate("store");

	console.log("deal from deal link action");
	console.log(deal);

	const dealUser = await User.findById(deal.user).select("plan");
	const dealUserPlan = dealUser.plan.type;

	// ----------------------- ULTIMATE PLAN --------------------------

	if (dealUserPlan === "ULTIMATE") {
		if (deal.linkCount < 4) {
			deal.linkClickHistory.last = "USER";
			deal.linkClickHistory.secondLast = "USER";
			deal.linkClickHistory.thirdLast = "USER";
			deal.linkCount = deal.linkCount + 1;

			await deal.save();
			return res.redirect(deal.link);
		}

		deal.linkClickHistory.thirdLast = deal.linkClickHistory.secondLast;
		deal.linkClickHistory.secondLast = deal.linkClickHistory.last;
		deal.linkClickHistory.last = "USER";
		deal.linkCount = deal.linkCount + 1;
		await deal.save();

		return res.redirect(deal.link);
	}

	// ----------------------- PREMIUM PLAN --------------------------

	if (dealUserPlan === "PREMIUM") {
		if (deal.linkCount < 4) {
			deal.linkClickHistory.last = "USER";
			deal.linkClickHistory.secondLast = "USER";
			deal.linkClickHistory.thirdLast = "USER";
			deal.linkCount = deal.linkCount + 1;
			await deal.save();
			return res.redirect(deal.link);
		}

		deal.linkClickHistory.thirdLast = deal.linkClickHistory.secondLast;
		deal.linkClickHistory.secondLast = deal.linkClickHistory.last;

		if (
			deal.linkClickHistory.last === "OUR" ||
			deal.linkClickHistory.secondLast === "OUR" ||
			deal.linkClickHistory.thirdLast === "OUR"
		) {
			deal.linkClickHistory.last = "USER";
			deal.linkCount = deal.linkCount + 1;
			await deal.save();

			return res.redirect(deal.link);
		} else {
			if (deal?.affiliateLink) {
				deal.affiliateLinkCount = deal.affiliateLinkCount + 1;
				deal.linkClickHistory.last = "OUR";
				await deal.save();
				return res.redirect(deal.affiliateLink);
			}

			if (deal?.store?.affiliateLink) {
				deal.store.affiliateLinkCount = deal.store.affiliateLinkCount + 1;
				deal.linkClickHistory.last = "OUR";
				await deal.save();
				return res.redirect(deal.store.affiliateLink);
			}

			// TODO: What if there affiliate link from our side

			deal.linkClickHistory.last = "USER";
			deal.linkCount = deal.linkCount + 1;
			await deal.save();
			return res.redirect(deal.link);
		}
	}

	// ----------------------- FREE PLAN --------------------------

	if (dealUserPlan === "FREE") {
		if (deal.linkCount === 0) {
			deal.linkClickHistory.last = "USER";
			deal.linkCount = deal.linkCount + 1;
			await deal.save();
			return res.redirect(deal.link);
		} else {
			if (deal.linkClickHistory.last === "OUR") {
				deal.linkClickHistory.thirdLast = deal.linkClickHistory.secondLast;
				deal.linkClickHistory.secondLast = deal.linkClickHistory.last;
				deal.linkClickHistory.last = "USER";
				deal.linkCount = deal.linkCount + 1;
				await deal.save();
				return res.redirect(deal.link);
			}

			if (deal.linkClickHistory.last === "USER") {
				deal.linkClickHistory.thirdLast = deal.linkClickHistory.secondLast;
				deal.linkClickHistory.secondLast = deal.linkClickHistory.last;

				if (deal?.affiliateLink) {
					deal.affiliateLinkCount = deal.affiliateLinkCount + 1;
					deal.linkClickHistory.last = "OUR";
					await deal.save();
					return res.redirect(deal.affiliateLink);
					a;
				}

				if (deal?.store?.affiliateLink) {
					deal.store.affiliateLinkCount = deal.store.affiliateLinkCount + 1;
					deal.linkClickHistory.last = "OUR";
					await deal.save();
					return res.redirect(deal.store.affiliateLink);
				}

				// TODO: What if there no affiliate link from our side

				deal.linkClickHistory.last = "USER";
				deal.linkCount = deal.linkCount + 1;
				await deal.save();
				return res.redirect(deal.link);
			}
		}
	}
});
