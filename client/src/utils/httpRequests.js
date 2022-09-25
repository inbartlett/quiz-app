import axios from "axios";

export const registerUser = async ({ event, ...data }) => {
  event.preventDefault();
  const response = await axios.post("http://localhost:8800/user/register", {
    ...data,
  });

  console.log(response.data);
};

export const loginUser = async ({ event, ...data }) => {
  event.preventDefault();
  const response = await axios.post("http://localhost:8800/user/login", {
    ...data,
  });

  return response.data;
};
