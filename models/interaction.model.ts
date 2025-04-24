import { Document, model, models, Schema, Types } from "mongoose";

export interface IInteraction {
	user: Types.ObjectId;
	action: string;
	actionId: Types.ObjectId;
	actionType: "question" | "answer";
}

export interface IInteractionDocument extends IInteraction, Document {}

const InteractionSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		action: {
			type: String,
			required: true,
		},
		actionId: {
			type: Schema.Types.ObjectId,
			required: true,
			refPath: "actionType",
		},
		actionType: {
			type: String,
			required: true,
			enum: ["question", "answer"],
		},
	},
	{
		timestamps: true,
	}
);

const Interaction =
	models?.Interaction ||
	model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
