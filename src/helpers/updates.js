export async function updateUserData(url, method, body) {
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Request-Method": method,
  });

  return fetch(url, {
    method: method,
    cache: "no-cache",
    credentials: "include",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}

export async function updateData(url, method, body, token) {
  let headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    "X-JWT-TOKEN": token,
    "Access-Control-Request-Method": method,
  });

  return fetch(url, {
    method: method,
    cache: "no-cache",
    credentials: "include",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}
