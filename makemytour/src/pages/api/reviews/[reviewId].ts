import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const Review = mongoose.models.Review;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reviewId } = req.query;

  if (req.method === "POST") {
    const { reply } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $push: { replies: { comment: reply } } },
      { new: true }
    );

    return res.status(200).json(review);
  }

  if (req.method === "PUT") {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { flagged: true },
      { new: true }
    );

    return res.status(200).json(review);
  }

  res.status(405).json({ message: "Method not allowed" });
}