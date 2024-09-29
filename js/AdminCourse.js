async function fetchCourses() {
    const userId = localStorage.getItem("user_id");
    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/course/`);

      const data = await response.json();
      const courseTableBody = document.getElementById('courseTableBody');
      courseTableBody.innerHTML = '';
      data.forEach(course => {
        console.log(course.id);

        const row = document.createElement('tr');

        row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${course.id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.title}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.instructor ? `${course.instructor.user.first_name} ${course.instructor.user.last_name}` : 'N/A'}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.department ? course.department : 'N/A'}</td>
      <td class="px-6 py-4 whitespace-nowrap">${course.amount}</td>
      <td class="px-6 py-4 whitespace-nowrap max-w-xs truncate">${course.description}</td>
      <td class="px-6 py-4 whitespace-nowrap">${new Date(course.created_at).toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <img src="${course.image}" class="w-14 h-14" alt="Course Image">
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="editCourse(${course.id})"><i class="fas fa-edit"></i>Edit</button>
        <button class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteCourse(${course.id})"><i class="fas fa-trash"></i>Delete</button>
      </td>
    `;

        courseTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }
  function editCourse(courseId) {
    console.log('Edit course with ID:', courseId);
  }

  function deleteCourse(courseId) {
    console.log('Delete course with ID:', courseId);
  }
  document.addEventListener('DOMContentLoaded', fetchCourses);
