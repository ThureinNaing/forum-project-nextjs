import z from "zod";

const BookmarkSchema = z.object({ questionId: z.string() });

export default BookmarkSchema;
