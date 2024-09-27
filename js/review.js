// Fetch and load reviews from the API
const loadReview = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/course/show-review/"); // Replace with your API endpoint
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const reviews = await res.json();

        DisplayReview(reviews); // Display reviews on the carousel
        initReviewCarousel(); // Initialize carousel functionality with the new function name
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
};

// Function to dynamically display reviews in the carousel
const DisplayReview = (reviews) => {
    const parent = document.getElementById("ReviewCard");
    parent.innerHTML = ''; // Clear previous reviews

    const fragment = document.createDocumentFragment(); // Create a document fragment for better performance

    reviews.forEach((review) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item", "p-4", "w-64", "sm:w-80", "snap-start"); // Fixed width for each card, responsive for mobile
        div.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
              <div class="flex items-center mb-4">
                <img src="${review.user.image || './image/girl.png'}" alt="${review.user.first_name || 'No Name'}" class="w-12 h-12 rounded-full">
                <div class="ml-4">
                  <h3 class="text-lg font-semibold">${review.user.first_name || 'No Name'} ${review.user.last_name || ''}</h3>
                  <div class="text-yellow-500">
                    <span>${review.rating_display || 'No Rating'}</span>
                  </div>
                </div>
              </div>
              <h2 class="text-sm font-bold text-teal-600">${review.course || 'No Doctor Name'}</h2>
              <p class="text-gray-600 mt-2">${review.body ? review.body.slice(0, 150) + '...' : 'No review available'}</p>
            </div>
        `;

        fragment.appendChild(div); // Add each card to the fragment
    });

    parent.appendChild(fragment); // Append the fragment to the carousel container
};

// Function to initialize carousel functionality
const initReviewCarousel = () => {
    const prevButton = document.getElementById('review-prev');
    const nextButton = document.getElementById('review-next');
    const carousel = document.getElementById('ReviewCard');

    const items = carousel.querySelectorAll('.carousel-item');

    if (!carousel || items.length === 0) {
        console.error('Review carousel items or buttons not found.');
        return;
    }

    prevButton.addEventListener('click', () => {
        const width = items[0].offsetWidth;
        carousel.scrollBy({ left: -width, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        const width = items[0].offsetWidth;
        carousel.scrollBy({ left: width, behavior: 'smooth' });
    });

    // Auto Slide for Review Carousel
    let index = 0;
    const autoSlideInterval = 3000;

    setInterval(() => {
        index = (index + 1) % items.length;
        const width = items[index].offsetWidth;
        carousel.scrollBy({ left: width, behavior: 'smooth' });

        if (index === items.length - 1) {
            setTimeout(() => {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
                index = -1;
            }, autoSlideInterval);
        }
    }, autoSlideInterval);
};

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadReview();
    initReviewCarousel();
});
