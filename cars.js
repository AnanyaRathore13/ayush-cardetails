document.addEventListener("DOMContentLoaded", async () => {
    const carGallery = document.getElementById("carGallery");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    let currentPage = 0; // Start from page 0
    const pageSize = 10; // Number of cars per page

    async function fetchCars(page) {
        try {
            const token = localStorage.getItem("authToken"); // Use stored auth token
            const response = await fetch(`https://2e5b-2401-4900-1c5a-ed51-ccb4-5af9-15ee-27ec.ngrok-free.app/user/allcars?page=${page}&size=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.text();
                alert("Failed to load cars: " + error);
                return;
            }

            const data = await response.json();

            // Clear the gallery before appending new cars
            carGallery.innerHTML = "";

            // Display cars
            data.content.forEach((car) => {
                const carCard = document.createElement("div");
                carCard.className = "car-card";

                // Display the first image or a placeholder
                const firstImage = car.imageUrls.length > 0
                    ? `data:image/jpeg;base64,${car.imageUrls[0]}`
                    : "https://via.placeholder.com/300x200?text=No+Image";

                carCard.innerHTML = `
                    <img src="${firstImage}" alt="${car.title}" class="car-image">
                    <div class="car-details">
                        <h3>${car.title}</h3>
                        <p>${car.description}</p>
                        <div class="car-tags">
                            ${car.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                carGallery.appendChild(carCard);
            });

            // Manage pagination buttons
            prevPageButton.disabled = data.first;
            nextPageButton.disabled = data.last;
        } catch (error) {
            console.error("Error fetching car data:", error);
            alert("An unexpected error occurred: " + error.message);
        }
    }

    // Event listeners for pagination buttons
    prevPageButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            fetchCars(currentPage);
        }
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        fetchCars(currentPage);
    });

    // Fetch the first page of cars
    fetchCars(currentPage);
});
