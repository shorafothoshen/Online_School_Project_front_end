// Function to fetch teacher profile from API
async function fetchTeacherProfile() {
    const userId=localStorage.getItem("user_id")
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/teachers/user/${userId}/`);
        const data = await response.json();

        // Update profile details in the HTML
        document.getElementById('teacher-name').textContent = `${data.user.first_name} ${data.user.last_name}`;
        document.getElementById('teacher-email').textContent = data.user.email;
        document.getElementById('teacher-bio').textContent = data.bio || 'No bio available';
        document.getElementById('teacher-location').textContent = `${data.City}, ${data.Country}`;
        document.getElementById('teacher-department').textContent = data.department;

        document.getElementById('teacher-profile-image').src = data.user.image || 'https://via.placeholder.com/150';
        document.getElementById('navbar-teacher-image').src = data.user.image || 'https://via.placeholder.com/150';

    } catch (error) {
        console.error('Error fetching teacher profile:', error);
    }
}

// Call the function to fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchTeacherProfile);