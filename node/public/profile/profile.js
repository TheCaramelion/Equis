import { getUserData } from "../../controllers/user";

const userData = getUserData();

displayUserProfile(userData);

function displayUserProfile(userData) {
  document.getElementById(
    "username"
  ).textContent = `Usuario: ${userData.username}`;
}

export default profile;
