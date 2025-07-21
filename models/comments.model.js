import mongoose from "mongoose";

const commentschema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'blog',
    },
    useri: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const comment = mongoose.model("comment", commentschema);