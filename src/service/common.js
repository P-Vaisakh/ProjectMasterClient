import axios from "axios";

export const req = async (method, url, data, reqHeaders) => {
  const config = {
    method,
    url,
    data,
    headers: reqHeaders ? reqHeaders : { "Content-Type": "application/json" },
  };
  return await axios(config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

