const LoadCourse=async ()=>{
    const peram=new URLSearchParams(location.search).get("courseId");
    const res=await fetch(`https://online-school-project.onrender.com/api/course/${peram}/`);
    const courseDetails=await res.json();
    displayCourse(courseDetails)
    console.log(courseDetails.reviews);
    
};

const displayCourse = (details) => {
    const course = document.getElementById("CourseDetails");
    const reviewCourse = document.getElementById("ReviewCourse");

    // Display Course Details
    course.innerHTML = `
        <img src="${details.image}" alt="Course Image" class="rounded-lg shadow-lg mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold mb-2">${details.title}</h1>
          <h1 class="text-4xl text-blue-700">${details.amount} <span><i class="fa-solid fa-bangladeshi-taka-sign"></i></span></h1>
        </div>
        <div class="flex items-center mb-4">
          <div class="text-yellow-500 text-lg">★★★★☆</div>
          <span class="ml-2 text-gray-700">(4.5)</span>
        </div>
        <p class="text-gray-700 mb-6">${details.description}</p>

        <h3 class="text-2xl font-semibold pb-4">Instructor</h3>
        <div class="flex items-center">
          <img src="${details.instructor.user.image}" alt="Instructor Image" class="w-12 h-12 rounded-full mr-4">
          <div>
            <h2 class="text-lg font-semibold">${details.instructor.user.first_name} ${details.instructor.user.last_name}</h2>
            <p class="text-gray-600">${details.department}</p>
          </div>
        </div>
    `;

    // Display Reviews

    if (details.reviews.length === 0) {
        reviewCourse.innerHTML = `<p class="text-gray-700">No reviews yet. Be the first to review this course!</p>`;
      } else {
        reviewCourse.innerHTML = details.reviews.map(review => `
            <div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <div class="flex items-center mb-2">
                <img src="${review.user.image || 'https://via.placeholder.com/48'}" alt="User Image" class="w-12 h-12 rounded-full mr-4">
                <div>
                  <h2 class="text-lg font-semibold">${review.user.first_name} ${review.user.last_name}</h2>
                  <div class="text-yellow-500 text-sm">${review.rating_display}</div>
                </div>
              </div>
              <p class="text-gray-700">${review.body}</p>
            </div>
        `).join('');
      }
};


const EnrollCourse=async()=> {

  const courseId=new URLSearchParams(location.search).get("courseId");
  const userId=localStorage.getItem("user_id")
  const data = {
      user_id: userId,
      course_id: courseId
  };
  try {
      const response = await fetch('https://online-school-project.onrender.com/payment/enroll/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      });
      // Check if the response was successful
      if (!response.ok) {
          throw new Error("Failed to enroll in course");
      }
      const result = await response.json();
      window.location.href = result.payment_url;; 
  } catch (error) {
      // Handle errors during the fetch request
      alert("Error enrolling in course: " + error.message);
      console.error(error);
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('#stars i');
  const modal = document.getElementById('review-modal');
  const closeModal = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const submitBtn = document.getElementById('submit-btn');
  const selectedRatingElement = document.getElementById('selected-rating');
  const reviewBodyElement = document.getElementById('review-body');
  let selectedRating = 0;

  // Click event for stars
  stars.forEach((star) => {
      star.addEventListener('click', function () {
          selectedRating = this.getAttribute('data-rating');
          selectedRatingElement.textContent = selectedRating;

          // Highlight the stars up to the clicked star
          stars.forEach((s, index) => {
              if (index < selectedRating) {
                  s.classList.add('active');
                  s.classList.remove('text-gray-400');
              } else {
                  s.classList.remove('active');
                  s.classList.add('text-gray-400');
              }
          });

          // Open the modal
          modal.classList.remove('hidden');
      });
  });

  // Close modal on click
  [closeModal, cancelBtn].forEach(element => {
      element.addEventListener('click', function () {
          modal.classList.add('hidden');
      });
  });

  // Submit review
  submitBtn.addEventListener('click', async function () {
    const reviewBody = reviewBodyElement.value;

    if (!selectedRating || !reviewBody) {
        alert("Please provide a rating and a review.");
        return;
    }

    const courseId = new URLSearchParams(location.search).get("courseId");

    try {
        const token = localStorage.getItem('Token');
        const user = localStorage.getItem('user_id');
        
        const response = await fetch(`https://online-school-project.onrender.com/api/course/reviews/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course:courseId,
                user:user,
                rating: selectedRating,
                body: reviewBody
            })
        });

        if (response.ok) {
            alert("Review submitted successfully.");
            window.location.reload();
            modal.classList.add('hidden');
            reviewBodyElement.value = ''; 
            selectedRatingElement.textContent = '0';
        } else if (response.status === 401) {
            alert("You must be logged in to submit a review.");
        } else {
            alert("Error submitting review.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error submitting reviewhhhh.");
    }
  });

});

LoadCourse();
