import axios from "axios";


export const callApi =  async ({url, method, data={}, params={}, }) => {
  const response = await axios({
    url,
    method,
    data,
    params,
  });
  return response;
}
