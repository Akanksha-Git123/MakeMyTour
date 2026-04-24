import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  hotelId: String,
  rating: Number,
  comment: String,
  photos: [String],
  helpfulVotes: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
  replies: [
    {
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { hotelId, sort } = req.query;

  if (req.method === "GET") {
    let sortOption: any = { createdAt: -1 };

    if (sort === "highest") sortOption = { rating: -1 };
    if (sort === "helpful") sortOption = { helpfulVotes: -1 };

    const reviews = await Review.find({ hotelId }).sort(sortOption);

    return res.status(200).json(reviews);
  }

  if (req.method === "POST") {
    const { rating, comment, photos, hotelId } = req.body;

    const review = await Review.create({
      hotelId,
      rating,
      comment,
      photos,
    });

    return res.status(201).json(review);
  }

  res.status(405).json({ message: "Method not allowed" });
}