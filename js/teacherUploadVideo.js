document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('user_id');  // Replace this with the dynamic user_id if needed
    const courseId = new URLSearchParams(location.search).get("TeacherCourseId");  // Replace this with the dynamic course_id if needed
    const selectWeekDropdown = document.getElementById('SetWeek');  // Reference to the select element

    try {
        // Fetch the weeks from the API
        const response = await fetch(`https://online-school-project.onrender.com/api/teachers/${userId}/courses/${courseId}/weeks/`);

        if (!response.ok) {
            throw new Error(`Error fetching weeks: ${response.statusText}`);
        }

        const weeks = await response.json();

        // Clear existing options in the select dropdown
        selectWeekDropdown.innerHTML = '';

        // Populate the select dropdown with fetched weeks
        weeks.forEach(week => {
            const option = document.createElement('option');
            option.value = week.id;
            option.textContent = week.name;  // Assuming the week object has a `name` field
            selectWeekDropdown.appendChild(option);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch week data.');
    }
});

const saveWeek = async (event) => {
    event.preventDefault();

    const weekName = document.getElementById('SetWeekName').value;
    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage
    const courseId = new URLSearchParams(location.search).get("TeacherCourseId"); // Get the course ID from the URL

    if (!weekName) {
        alert('Please enter a week name.');
        return;
    }

    try {
        const response = await fetch(`https://online-school-project.onrender.com/api/teachers/${userId}/courses/${courseId}/weeks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: weekName,
                course_id: courseId,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Week saved successfully!');
            location.reload();
            // Handle successful response...
        } else {
            const errorData = await response.json();
            console.error('Error saving week:', errorData);
            alert('Failed to save the week.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const uploadVideo = async (event) => {
    event.preventDefault();

    const videoUpload = document.getElementById('video-upload');
    const videoFile = videoUpload.files[0];
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const weekSelect = document.querySelector('select[name="week"]');
    const week = weekSelect.value;

    // Ensure all fields have values
    if (!videoFile || !title || !week) {
        alert('Please fill out all required fields.');
        return;
    }

    // Get userId from local storage
    const userId = localStorage.getItem('user_id');
    // Get courseId from the URL
    const courseId = new URLSearchParams(location.search).get("TeacherCourseId");

    if (videoFile && userId && courseId) {
        const formData = new FormData();
        formData.append('video_file', videoFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('week', week);
        formData.append('course_id', courseId); // Append the course ID here
        formData.append('user_id', userId);     // Append the user ID here (if necessary)

        try {
            const response = await fetch(`https://online-school-project.onrender.com/api/teachers/${userId}/videos/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const upload = await response.json();
                alert('Video uploaded successfully!');
                fetchVideos(); // Refresh the video list after uploading
            } else {
                const errorData = await response.json();
                console.error('Upload error:', errorData);
                alert('Failed to upload video');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    } else {
        alert('Missing video file, userId, or courseId');
    }
};


// Fetch videos via API
async function fetchVideos() {
    const courseId = new URLSearchParams(location.search).get("TeacherCourseId");
    const videoList = document.getElementById('video-list');
    const noVideosMessage = document.getElementById('no-videos-message');

    const userId = localStorage.getItem('user_id');

    try {
        const response = await fetch(`https://online-school-project.onrender.com/api/teachers/${userId}/courses/${courseId}/videos/`);
        const videos = await response.json();

        videoList.innerHTML = ''; // Clear the video list

        if (videos.length === 0) {
            noVideosMessage.style.display = 'block';
        } else {
            noVideosMessage.style.display = 'none';

            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'bg-white rounded-lg shadow-lg overflow-hidden';

                videoItem.innerHTML = `
                    <div class="relative pb-56 mb-4">
                        <video class="absolute top-0 left-0 w-full h-full object-cover rounded-md" controls>
                            <source src="${video.video_file}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="p-4 text-center">
                        <h2 class="text-lg font-semibold text-gray-700">${video.title}</h2>
                        <p class="text-sm text-gray-500">${video.description}</p>
                    </div>
                `;

                videoList.appendChild(videoItem);
            });
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

// Initialize page with course ID and fetch videos on load
document.addEventListener("DOMContentLoaded", () => {
    const courseId = getCourseIdFromUrl();
    if (courseId) {
        document.getElementById('course-id').textContent = courseId;
        fetchVideos();
    }
});


// Initialize page with course ID and fetch videos on load
document.addEventListener("DOMContentLoaded", () => {
    const courseId = getCourseIdFromUrl();
    if (courseId) {
        document.getElementById('course-id').textContent = courseId;
        fetchVideos();
    }
});