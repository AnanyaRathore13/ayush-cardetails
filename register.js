const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const registerData = {
        name,
        username,
        password,
    };

    try {
        const response = await fetch("https://2e5b-2401-4900-1c5a-ed51-ccb4-5af9-15ee-27ec.ngrok-free.app/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const contentType = response.headers.get("Content-Type");

        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                alert("Registration successful: " + result.message);
            } else {
                const result = await response.text();
                alert("Registration successful: " + result);
            }
            document.getElementById("message").innerText = "Registration successful!";
        } else {
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json();
                alert("Registration failed: " + error.message);
            } else {
                const error = await response.text();
                alert("Registration failed: " + error);
            }
            document.getElementById("message").innerText = "Registration failed.";
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An unexpected error occurred: " + error.message);
    }
});
