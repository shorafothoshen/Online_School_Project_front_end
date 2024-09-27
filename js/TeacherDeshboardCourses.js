// Get user_id from local storage
const userId = localStorage.getItem("user_id");

if (userId) {
    // Fetch the courses created by this teacher using their user_id
    const TeacherCreateDisplayCourse = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/teachers/${userId}/courses/`);

            if (!response.ok) {
                const errorMessage = await response.text();  // Get the error message from the response
                throw new Error(`Failed to fetch courses: ${errorMessage}`);
            }

            const courses = await response.json();
            displayCourses(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Function to render courses
const displayCourses = (courses) => {
    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = '';  // Clear previous content

    courses.forEach(course => {
        const courseCard = `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out block">
            <a href="./TeacherUploadVideoForm.html?TeacherCourseId=${course.id}">
                <img class="w-full h-48 object-cover" src="${course.image || 'https://via.placeholder.com/300'}" alt="${course.title}">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900">${course.title}</h3>
                    <p class="text-gray-600 mt-2">Department: <span class="font-medium">${course.department}</span></p>
                    <p class="text-gray-600 mt-2">Amount: $${course.amount}</p>
                </div>
            </a>
            <!-- Edit and Delete buttons below the card -->
            <div class="p-6 flex space-x-3">
                <a href="./TeacherEditCourseForm.html?TeacherCourseId=${course.id}"><button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Edit</button></a>
                <button onclick="deleteCourse(${course.id})" class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
            </div>
        </div>
        `;

        courseContainer.insertAdjacentHTML('beforeend', courseCard);
    });
};


    // Call the function to fetch and display courses
    TeacherCreateDisplayCourse();
} else {
    console.error("No user ID found in local storage");
}


// Function to delete a course
const deleteCourse = async (courseId) => {
    const userId = localStorage.getItem("user_id");
    const confirmation = confirm("Are you sure you want to delete this course?");
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/teachers/${userId}/courses/${courseId}/`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Course deleted successfully!');
            location.reload()
        } else {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete course: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error deleting course:', error);
    }
};


