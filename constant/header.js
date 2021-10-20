export default function({ token }) {

  const headers = {
    "Content-Type": "application/json",
    "X-localization": "id",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
