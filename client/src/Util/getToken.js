export const getToken = async (url) => {
  const response = await fetch(url, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
