import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { address, username, image } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOne({ address: address });

    if (!user) {
      const newUser = new User({ address, username, image });
      await newUser.save();
      return new Response(JSON.stringify(request), { status: 201 });
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { address: address },
        { $set: { username: username, image: image } },
        { new: true }
      );

      if (!updatedUser) {
        return new Response("User not found", { status: 404 });
      }

      return new Response(JSON.stringify(request), { status: 201 });
    }
  } catch (error) {
    return new Response("Failed to create/update user", { status: 500 });
  }
};
