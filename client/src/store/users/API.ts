import { Expedient, User } from "../../utils/types";
import axios from "axios";

export function fetchUsers() {
  return new Promise<{
    data: User[];
  }>((resolve) => resolve(axios.get(`http://52.214.212.142/api/users`)));
}
