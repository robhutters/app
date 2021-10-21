export async function grabToken() {
  return fetch("http://localhost:4010/api/auth/token", {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      if (result.status === true) {
        return result.token;
      }
    })
    .catch((err) => err);
}
