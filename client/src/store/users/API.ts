import { Expedient, User } from "../../utils/types";
import axios from "axios";

export function fetchUsers() {
  return new Promise<{
    data: User[];
  }>((resolve) => resolve(axios.get(`http://localhost/api/users`)));
}
