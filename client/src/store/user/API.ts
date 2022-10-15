import { token, user } from "../../data";
import { User } from "../../utils/types";

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
  return new Promise<{ data: { user: User; token: string } }>((resolve) =>
    setTimeout(() => resolve({ data: { user, token } }), 500)
  );
}
