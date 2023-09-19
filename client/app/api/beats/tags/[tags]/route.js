// Import necessary dependencies

import { connectToDB } from "@utils/database";
import Beat from "@models/beat";

export const GET = async (req, { params }) => {
  // const searchParams = useSearchParams();
  // const tags = searchParams.get("tags");
  //console.log("test");
  try {
    await connectToDB();
    //console.log("Requete:", req.url);
    //const { tags } = req.query;
    const tags = params.tags;
    console.log("Tags:", tags);

    const tagArray = tags.split(","); // Convert comma-separated tags to an array
    const beats = await Beat.find({ tags: { $in: tagArray } });
    if (!beats) return new Response("Beat Not Found", { status: 404 });
    //console.log(user);

    return new Response(JSON.stringify(beats), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
