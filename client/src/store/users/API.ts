import { Expedient, User } from "../../utils/types";
import axios from "axios";

export function fetchUsers() {
  return new Promise<{
    data: User[];
  }>((resolve) => resolve(axios.get(`http://3.253.49.204:8080/users`)));
}
