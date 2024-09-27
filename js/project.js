document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    const totalCards = carousel.children.length;
    let visibleCards = 4; // Default to 4 cards for desktop

    // Function to calculate the number of visible cards based on screen width
    const updateVisibleCards = () => {
        if (window.innerWidth < 640) {
            visibleCards = 2; // 2 cards on mobile
        } else {
            visibleCards = 4; // 4 cards on desktop
        }
        updateCarousel();
    };

    // Function to update the carousel position
    const updateCarousel = () => {
        const cardWidth = carousel.children[0].offsetWidth;
        const maxIndex = totalCards - visibleCards;
        const offset = -(currentIndex * cardWidth);
        carousel.style.transform = `translateX(${offset}px)`;
    };

    // Go to the next slide
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the start
        }
        updateCarousel();
    });

    // Go to the previous slide
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalCards - visibleCards; // Go to the last set of visible cards
        }
        updateCarousel();
    });

    // Auto-slide every 3 seconds
    let autoSlideInterval = setInterval(() => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the start
        }
        updateCarousel();
    }, 3000);

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < totalCards - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to the start
            }
            updateCarousel();
        }, 3000);
    });

    // Handle window resize
    window.addEventListener('resize', updateVisibleCards);

    // Initial setup
    updateVisibleCards();

    // Teacher Carousel
    const teacherCarouselTrack = document.getElementById('teacher-carousel');
    const prevTeacherButton = document.querySelector('.carousel-button-prev');
    const nextTeacherButton = document.querySelector('.carousel-button-next');
    let teacherIndex = 0;
    const itemsToShow = 3;
    const teacherItems = document.querySelectorAll('.carousel-item');
    const teacherTotalItems = teacherItems.length;

    const updateTeacherCarousel = () => {
        const percentage = -teacherIndex * (100 / itemsToShow);
        teacherCarouselTrack.style.transition = 'transform 0.5s ease';
        teacherCarouselTrack.style.transform = `translateX(${percentage}%)`;
    };

    const autoRunTeacherCarousel = () => {
        if (teacherIndex >= teacherTotalItems - itemsToShow) {
            teacherIndex = 0;
            teacherCarouselTrack.style.transition = 'none';
            teacherCarouselTrack.style.transform = 'translateX(0%)';
            setTimeout(updateTeacherCarousel, 50);
        } else {
            teacherIndex++;
            updateTeacherCarousel();
        }
    };

    prevTeacherButton.addEventListener('click', () => {
        teacherIndex = (teacherIndex <= 0) ? teacherTotalItems - itemsToShow : teacherIndex - 1;
        updateTeacherCarousel();
    });

    nextTeacherButton.addEventListener('click', () => {
        autoRunTeacherCarousel();
    });

    let autoTeacherRunInterval = setInterval(autoRunTeacherCarousel, 3000);

    teacherCarouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoTeacherRunInterval);
    });

    teacherCarouselTrack.addEventListener('mouseleave', () => {
        autoTeacherRunInterval = setInterval(autoRunTeacherCarousel, 3000);
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("hidden");
}


// Toggle Mobile Dropdown
function toggleMobileDropdown() {
    const mobileDropdownMenu = document.getElementById("mobileDropdownMenu");
    mobileDropdownMenu.classList.toggle("hidden");
}

// Hide mobile dropdown when clicking outside
document.addEventListener("click", (event) => {
    const mobileDropdownMenu = document.getElementById("mobileDropdownMenu");
    if (!event.target.closest("#mobileProfileDropdown")) {
        mobileDropdownMenu.classList.add("hidden");
    }
});
