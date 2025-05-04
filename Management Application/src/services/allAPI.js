import commonAPI from "./commonAPI";

// Register a new user
export const onRegister = async (data) => {
  return await commonAPI('post', '/register', data, {});
};

// Verify OTP during registration
export const onVerify = async (otp) => {
  return await commonAPI("post", `/register/${otp}`, {}, {});
};

// Login user with email and password
export const onLogin = async (data) => {
  return await commonAPI('post', '/login', data, {});
};

// Save flowchart (nodes and edges)
export const onSaveFlow = async (data, header) => {
  return await commonAPI('post', '/flow/save', data, header);
};

// Get saved flowchart
export const onGetFlow = async (header) => {
  return await commonAPI('get', '/flow/load', {}, header);
};

// Get user profile (JWT protected)
export const onGetProfile = async (header) => {
  return await commonAPI('get', '/fetch/profile', {}, header);
};
