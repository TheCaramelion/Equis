const apiUrl = "http://localhost:8000/api/auth";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const email = document.getElementById("signupEmail").value;

  try {
    const res = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (!res.ok) {
      const error = await res.json();
      document.getElementById("signupError").innerText =
        error.message || "Error al registrarse";
      return;
    }

    window.location.href = "../signin";
  } catch (err) {
    document.getElementById("signupError").innerText = "Error de conexión.";
  }
});
