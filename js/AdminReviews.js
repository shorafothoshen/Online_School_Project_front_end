async function fetchReviews() {
    const userId = localStorage.getItem("user_id")
    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/reviews/`);
      const data = await response.json();
      const reviewsTableBody = document.getElementById('reviewsTableBody');

      reviewsTableBody.innerHTML = '';
      data.forEach(review => {
        const row = document.createElement('tr');

        row.innerHTML = `
              <td class="px-6 py-4 whitespace-nowrap">${review.id}</td>
              <td class="px-6 py-4 whitespace-nowrap">${review.course}</td>
              <td class="px-6 py-4 whitespace-nowrap">${review.user.first_name} ${review.user.last_name}</td>
              <td class="px-6 py-4 whitespace-nowrap">${review.rating_display}</td>
              <td class="px-6 py-4 whitespace-nowrap max-w-xs truncate">${review.body}</td>
              <td class="px-6 py-4 whitespace-nowrap">${new Date(review.created_on).toLocaleDateString()}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="editReview(${review.id})"><i class="fas fa-edit"></i>Edit</button>
                  <button class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteReview(${review.id})"><i class="fas fa-trash"></i>Delete</button>
              </td>
          `;

        reviewsTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  }

  // Example edit and delete functions
  function editReview(reviewId) {
    console.log('Edit review with ID:', reviewId);
    // Implement edit logic here
  }

  function deleteReview(reviewId) {
    console.log('Delete review with ID:', reviewId);
    // Implement delete logic here
  }

  // Call the fetchReviews function on page load
  document.addEventListener('DOMContentLoaded', fetchReviews);
