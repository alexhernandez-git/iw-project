import { token, user } from "../../data";
import { User } from "../../utils/types";
import axios from "axios";
// A mock function to mimic making an async request for data
export function fetchUser(token: string) {
  return new Promise<{ data: User }>((resolve) =>
    setTimeout(() => resolve({ data: user }), 2000)
  );
}

export function userLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return new Promise<{ data: { user: User; accessToken: string } }>((resolve) =>
    resolve(
      axios.post("http://localhost:8080/users/login", {
        email: username,
        password,
      })
    )
  );
}
