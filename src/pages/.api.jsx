export const simulateregistration = (userdata) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userdata.email === 'existing@example.com') {
        resolve({ message: 'Account with this email already exists' });
      } else {
        resolve({ message: 'User registered successfully' });
      }
    }, 1000);
  });
};
