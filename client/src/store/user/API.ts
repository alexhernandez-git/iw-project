import { User } from "../../utils/types";
import axios from "axios";

export function fetchUser(token: string) {
  return new Promise<{ data: User }>((resolve) =>
    resolve(axios.get(`http://34.244.188.175/api/users/get-user/${token}`))
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
      axios.post(`http://34.244.188.175/api/users/login`, {
        email: username,
        password,
      })
    )
  );
}

export function updateUser(
  id: string,
  user: {
    firstName?: string;
    lastName?: string;
    expedientsTableFields?: string[];
  }
) {
  return new Promise<{ data: { user: User; accessToken: string } }>((resolve) =>
    resolve(axios.patch(`http://34.244.188.175/api/users/${id}`, user))
  );
}
