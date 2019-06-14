import axios from "axios";


export const callApi =  async ({url, method, data={}, params={}, headers={}}) => {
  const response = await axios({
    url,
    method,
    data,
    params,
    headers,
  });
  return response;
}
