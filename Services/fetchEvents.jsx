import axios from "axios";
export const fetchEvents = async ({ queryKey }) => {
  const apiRes = await axios.get(
    "https://mocki.io/v1/7b47d683-984a-4fe8-9d40-4fc57a71145a",
  );

  if (apiRes.status != 200) {
    throw new Error("the api didnt respond with the events");
  }
  return apiRes;
};
