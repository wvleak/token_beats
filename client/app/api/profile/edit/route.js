export const POST = async (request) => {
  //   const { username, image } = await request.json();
  //   console.log("username:", username);
  //   console.log("image:", image);
  try {
    //   await connectToDB();
    //   const newUser = new User({ username, image });
    //   await newUser.save();
    return new Response(JSON.stringify(request), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new user", { status: 500 });
  }
};