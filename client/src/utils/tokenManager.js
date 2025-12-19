// Get token from localStorage (client-side storage)
export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '';
};

// Set token
export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Remove token
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};