import { Document, model, models, Schema, Types } from "mongoose";

export interface ICollection {
	author: Types.ObjectId;
	question: Types.ObjectId;
}

export interface ICollectionDocument extends ICollection, Document {}
//for  bookmarked questions
const CollectionSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		question: {
			type: Schema.Types.ObjectId,
			ref: "Question",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
//a user can't have the same question in their bookmark more than once
CollectionSchema.index({ author: 1, question: 1 }, { unique: true });

const Collection =
	models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
