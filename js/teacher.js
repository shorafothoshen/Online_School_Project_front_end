const LoadTeacherProfile=async()=>{
    const peram=new URLSearchParams(location.search).get("TeacherId");
    const teacherdoc=document.getElementById("TeacherprofileDetails");
    console.log(peram);
    
    const res=await fetch(`https://online-school-989z.onrender.com/api/teachers/${peram}/`);
    const teacher=await res.json();
    
    console.log(teacher);
    
    teacherdoc.innerHTML=`
         <div class="md:w-2/3 w-full md:pr-6 mb-6 md:mb-0">
                <div class="bg-green-700 text-white text-xl font-medium rounded-md py-3 px-5 inline-block mb-4">
                    Software Engineering Bootcamp: ${teacher.department}
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">${teacher.user.first_name} ${teacher.user.last_name}</h1>
                <p class="text-gray-600 mb-1">
                    <span class="font-semibold">Before Springboard:</span> Amazon warehouse associate
                </p>
                <p class="text-gray-600 mb-4">
                    <span class="font-semibold">After Springboard:</span> IT support engineer at Amazon
                </p>
                <blockquote class="border-l-4 border-green-600 pl-4 text-gray-700 italic">
                   ${teacher.bio}
                </blockquote>
            </div>
            <div class="md:w-1/3 w-full">
                <img src="${teacher.user.image}" alt="Rafael Alvarado" class="rounded-lg shadow-lg w-full object-cover">
            </div>
    `
    
}

LoadTeacherProfile();