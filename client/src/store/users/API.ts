import { Expedient, User } from "../../utils/types";
import axios from "axios";

export function fetchUsers() {
  return new Promise<{
    data: User[];
  }>((resolve) => resolve(axios.get(`http://34.244.188.175/api/users`)));
}
