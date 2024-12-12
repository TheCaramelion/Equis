import { getUserData } from "../controllers/user";

const user = getUserData();

if (user === null) {
  window.location.href("../");
}
