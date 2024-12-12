const apiUrl = "http://localhost:8000/api/auth";

document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const res = await fetch(`${apiUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      document.getElementById("signinError").innerText =
        error.message || "Error al iniciar sesión";
      return;
    }

    window.location.href = "../";
  } catch (err) {
    document.getElementById("signinError").innerText = "Error de conexión.";
    console.log(err);
  }
});
