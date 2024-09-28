const loadCard=async()=>{
    const res=await fetch("https://online-school-989z.onrender.com/api/course/");
    const cards=await res.json();

    displayCards(cards);
}

const displayCards=(card)=>{
    const parentCard=document.getElementById("CourseCard");
    card.forEach(element => {
        const div=document.createElement("div");
        div.classList.add("bg-white","rounded-lg","shadow-md","overflow-hidden");
        div.innerHTML=`
            <img class="w-full h-48 object-cover" src="${element.image}" alt="JavaScript Course">
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-2xl font-semibold text-gray-800">${element.title}</h3>
                            <span class="text-purple-500 text-lg font-semibold">${element.amount} <i class="fa-solid fa-bangladeshi-taka-sign"></i></span>
                        </div>
                           <h3 class="text-xl font-semibold text-gray-800">${element.instructor.user.first_name} ${element.instructor.user.last_name}</h3>
                        <div class="flex items-center mt-2">
                            <span class="text-yellow-400 mr-2">★★★★☆</span>
                            <span class="text-gray-600">(239)</span>
                        </div>
                        <div class="flex justify-center items-center mt-4">
                            <a href="./CourseDetailsPage.html?courseId=${element.id}" class="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300">
                                Details
                            </a>
                        </div>
                    </div>

        `;

        parentCard.appendChild(div);

    });
}

// Fetch and load reviews from the API
const LoadTeacher = async () => {
    try {
        const res = await fetch("https://online-school-989z.onrender.com/api/teachers/"); // Replace with your API endpoint
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const teachers = await res.json();

        DisplayTeacher(teachers); // Display reviews on the carousel
        initializeCarousel(); // Initialize carousel functionality
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
};

// Function to dynamically display reviews in the carousel
const DisplayTeacher = (teachers) => {
    const parent = document.getElementById("TeacherCard");
    parent.innerHTML = ''; // Clear previous reviews

    const fragment = document.createDocumentFragment(); // Create a document fragment for better performance

    teachers.forEach((teacher) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item", "p-4", "w-64", "sm:w-80", "snap-start"); // Fixed width for each card, responsive for mobile
        div.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 text-center">
                <img class="w-32 h-32 rounded-full mx-auto mb-4" src="${teacher.user.image || 'https://via.placeholder.com/150'}" alt="${teacher.user.first_name || 'No Name'}">
                <h2 class="text-xl font-semibold text-gray-800">${teacher.user.first_name || 'No Name'} ${teacher.user.last_name || ''}</h2>
                <p class="text-gray-500 mb-4">${teacher.department || 'Position not available'}</p>
                <a href="./teacher.html?TeacherId=${teacher.id}" class="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300">Read Story</a>
            </div>
        `;

        fragment.appendChild(div); // Add each card to the fragment
    });

    parent.appendChild(fragment); // Append the fragment to the carousel container
};

// Function to initialize carousel functionality
const initializeTeacherCarousel = () => {
    const prevButton = document.getElementById('teacher-prev');
    const nextButton = document.getElementById('teacher-next');
    const carousel = document.getElementById('TeacherCard');

    const items = carousel.querySelectorAll('.carousel-item');

    if (!carousel || items.length === 0) {
        console.error('Teacher carousel items or buttons not found.');
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

    // Auto Slide for Teacher Carousel
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
    LoadTeacher();
    initializeTeacherCarousel();
});


loadCard();



