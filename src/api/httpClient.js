import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://test.gymsoft.ir/api",
});

httpClient.interceptors.response.use(({ data }) => data);

export { httpClient };
