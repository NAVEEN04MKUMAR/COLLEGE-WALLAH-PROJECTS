export async function signupAPI(formdata) {
  // Simulate a delayed response to mimic server latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: 'Userrrrr registered successfully' };
}


export async function getuserdataAPI() {
  await new Promise((resolve) => setTimeout(resolve, 1000));  
  const user = {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    full_name: 'John Doe',
    avatar: 'https://example.com/avatar/john_doe.jpg',
    bio: "I'm a developer and explorer.",
    location: 'New York, USA',
  };

  return user;
}
