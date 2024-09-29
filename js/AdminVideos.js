const fetchVideos = async () => {
    const userId = localStorage.getItem("user_id")
    try {
      const response = await fetch(`https://online-school-989z.onrender.com/api/admin/${userId}/CourseVideo/`);
      const data = await response.json();
      renderVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const renderVideos = (videos) => {
    const videoTableBody = document.getElementById("video-table-body");
    videoTableBody.innerHTML = "";

    videos.forEach((video) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap">${video.id}</td>
          <td class="px-6 py-4 whitespace-nowrap">${video.course}</td>
          <td class="px-6 py-4 whitespace-nowrap">${video.week.name}</td>
          <td class="px-6 py-4 whitespace-nowrap">${video.title}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="relative pb-32 w-44">
              <video class="absolute top-0 left-0 w-full h-full object-cover rounded-md" controls>
                <source src="${video.video_file}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap max-w-xs truncate">${video.description}</td>
          <td class="px-6 py-4 whitespace-nowrap">${video.uploaded_at}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Delete
            </button>
          </td>
        `;

      videoTableBody.appendChild(row);
    });
  };

  window.onload = fetchVideos;