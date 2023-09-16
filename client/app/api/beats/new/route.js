import Beat from "@models/beat";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { title, tags } = await request.json();
  try {
    await connectToDB();
    const newBeat = new Beat({ title, tags });
    await newBeat.save();
    console.log("success tag");
    return new Response(JSON.stringify(request), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new user", { status: 500 });
  }
};
