// Import necessary dependencies
import { connectToDB } from "@utils/database";
import Beat from "@models/beat";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const { tags } = req.query;

    const tagArray = tags.split(","); // Convert comma-separated tags to an array
    const beats = await Beat.find({ tags: { $in: tagArray } });
    if (!beats) return new Response("Beat Not Found", { status: 404 });
    //console.log(user);

    return new Response(JSON.stringify(beat), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
