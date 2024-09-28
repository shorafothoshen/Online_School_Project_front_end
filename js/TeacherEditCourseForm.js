document.addEventListener("DOMContentLoaded", async function () {
    const form = document.querySelector("form");
    const userId = localStorage.getItem('user_id');
    const courseId = new URLSearchParams(location.search).get("TeacherCourseId");

    // Fetch existing course data to pre-fill form
    try {
        const response = await fetch(`https://online-school-989z.onrender.com/api/teachers/${userId}/courses/${courseId}/`);
        if (response.ok) {
            const course = await response.json();
            document.getElementById("title").value = course.title;
            document.getElementById("amount").value = course.amount;
            document.getElementById("description").value = course.description;
            // Handle image preview or other fields if needed
        } else {
            console.error("Failed to fetch course data");
        }
    } catch (error) {
        console.error("Error fetching course:", error);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture the input field values using the id names
        const title = document.getElementById("title").value;
        const amount = document.getElementById("amount").value;
        const description = document.getElementById("description").value;
        const imageFile = document.getElementById("image").files[0]; // Capture the image file

        // Create form data for sending file and other fields
        const formData = new FormData();
        formData.append("title", title);
        formData.append("amount", amount);
        formData.append("description", description);

        if (imageFile) {
            formData.append("image", imageFile); // Add image if uploaded
        }

        try {
            const response = await fetch(`https://online-school-989z.onrender.com/api/teachers/${userId}/courses/${courseId}/`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Course updated successfully!");
                window.location.href = "./TeacherDeshborad.html"; // Redirect to the dashboard after success
            } else {
                console.error("Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    });
});