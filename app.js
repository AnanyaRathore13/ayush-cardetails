document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const responseMessage = document.getElementById("responseMessage");
    responseMessage.textContent = ""; // Clear previous messages

    // Ensure both fields are filled
    if (!username || !password) {
        responseMessage.textContent = "Please enter both username and password.";
        return;
    }

    const apiUrl = "https://2e5b-2401-4900-1c5a-ed51-ccb4-5af9-15ee-27ec.ngrok-free.app/auth/login"; // Replace with your API URL

    const loginData = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const responseBody = await response.json(); // Parse response as JSON

        if (response.ok) {
            const token = responseBody.jwtToken; // Get the token from the response body
            
            // Check if the token is available
            if (token) {
                localStorage.setItem("authToken", token); // Save the token to localStorage
                console.log("Token saved to localStorage:", token); // Log the token to verify it's saved
                
                alert("Login successful!");  // Notify the user
                window.location.href = "/hi.html"; // Redirect to the dashboard
            } else {
                alert("Login failed: No token received.");
            }
        } else {
            alert("Login failed: " + responseBody.message); // Show error message
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An unexpected error occurred: " + error.message); // Handle unexpected errors
    }
});


// if (!localStorage.getItem("authToken")) {
//     alert("You must log in first.");
//     window.location.href = "/index.html";
// }
