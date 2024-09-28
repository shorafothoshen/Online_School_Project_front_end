const LoadVideoDetails = async () => {
  const courseId = new URLSearchParams(location.search).get("coursvideoId");
  const res = await fetch(`https://online-school-989z.onrender.com/api/course/${courseId}/videos/`);
  const courseVideo = await res.json();

  displayVideo(courseVideo);
};

const displayVideo = (items) => {
  const module = document.getElementById("carousel");
  items.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("p-4", "border-b", "week-section");
    div.setAttribute("data-expanded", "false");
    let videosHtml = '';
    
    element.videos.forEach(video => {
      videosHtml += `
        <div class="flex items-center gap-2 space-x-3">
          <i class="fa-regular fa-circle-play"></i>
          <a href="${video.id}" onclick="loadVideo(${video.id}, event)" class="text-blue-500">${video.title}</a>
        </div>`;
    });

    div.innerHTML = `
      <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold">${element.name}</h2>
          <button class="toggle-details text-blue-500">+</button>
      </div>
      <div class="details hidden mt-2">
        ${videosHtml}
      </div>`;
    
    module.appendChild(div);

    const button = div.querySelector(".toggle-details");
    button.addEventListener("click", () => {
      const parent = button.closest(".week-section");
      const details = parent.querySelector(".details");
      const expanded = parent.getAttribute("data-expanded") === "true";

      parent.setAttribute("data-expanded", !expanded);
      details.classList.toggle("hidden");
      button.textContent = expanded ? "+" : "-";
    });
  });
};

const loadVideo = async (videoId, event) => {
  event.preventDefault();
  
  const videoPlayer = document.getElementById("videoPlayer");
  const videoSource = document.getElementById("videoSource");
  const videoTitle = document.getElementById("videoTitle");
  
  try {
    const res = await fetch(`https://online-school-989z.onrender.com/api/course/video/${videoId}/`);
    const videoData = await res.json();

    if (videoData && videoData.video_file) {
      videoSource.src = videoData.video_file;
      videoPlayer.load(); // Reload the video player to load the new source
      videoTitle.textContent = videoData.title;
      document.getElementById("videoPlayerSection").classList.remove("hidden");
    } else {
      console.error('video_file not found in the response:', videoData);
    }
  } catch (error) {
    console.error('Error fetching video data:', error);
  }
};

LoadVideoDetails();
