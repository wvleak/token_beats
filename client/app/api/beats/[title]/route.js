// Import necessary dependencies
import { connectToDB } from "@utils/database";
import Beat from "@models/beat";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const beat = await Beat.findOne({
      title: params.title.toString(),
    });
    if (!beat) return new Response("User Not Found", { status: 404 });
    //console.log(user);

    return new Response(JSON.stringify(beat), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
