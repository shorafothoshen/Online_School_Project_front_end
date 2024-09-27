document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture the input field values using the id names
        const title = document.getElementById("title").value;
        const amount = document.getElementById("amount").value;
        const description = document.getElementById("description").value;
        const imageFile = document.getElementById("image").files[0]; // Capture the image file
        const userId = localStorage.getItem('user_id'); // Assuming the user ID is stored in localStorage

        // Use FormData to append the fields individually
        const formData = new FormData();
        formData.append("title", title); 
        formData.append("amount", amount); 
        formData.append("description", description);
        if (imageFile) {
            formData.append("image", imageFile); // Append image file if exists
        }

        try {
            // Send a POST request to the back-end API
            const response = await fetch(`http://127.0.0.1:8000/api/teachers/${userId}/courses/`, {
                method: "POST",
                body: formData // Send FormData directly
            });

            // Handle response
            if (response.ok) {
                const result = await response.json();
                window.location.href = "./TeacherDeshborad.html"; // Redirect to the dashboard
                alert("Course created successfully!");
                console.log("Course created:", result);
            } else {
                const error = await response.json();
                console.error("Error creating course:", error);
                alert("Failed to create course.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error. Please try again.");
        }
    });
});
