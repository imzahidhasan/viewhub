function getById(id) {
  const element = document.getElementById(id);
  return element;
}

async function getCategory() {
  const url = "https://openapi.programming-hero.com/api/videos/categories";
  const res = await fetch(url);
  const { data } = await res.json();
  data.forEach((element) => {
    const btn = document.createElement("button");
    btn.classList = "btn allBtn";
    btn.innerText = element.category;

    btn.addEventListener("click", () => {
      const allBtn = document.querySelectorAll(".allBtn");
      allBtn.forEach((elem) => {
        elem.classList.remove("bg-red-600");
      });
      btn.classList.add("bg-red-600");
      getCategoryId(element.category_id);
    });

    getById("category-btn").appendChild(btn);
  });
}
let selectedId = 1000;
let isSorted = false;
getById("sortBtn").addEventListener("click", () => {
  isSorted = true;
  getCategoryId(selectedId, isSorted);
});
const getCategoryId = async (id, isSorted) => {
  selectedId = id;
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const res = await fetch(url);
  const { data } = await res.json();
  if (data.length === 0) {
    getById("alertBox").classList.remove("hidden");
  }

  if (isSorted) {
    data.sort((a, b) => {
      let firstVideo = a.others?.views;
      let secondVideo = b.others?.views;
      let firstVideoView = parseFloat(firstVideo.replace("k", ""));
      let secondVideoView = parseFloat(secondVideo.replace("k", ""));
      return secondVideoView - firstVideoView;
      //   return firstVideoView-secondVideoView
    });
  }
  getById("video-container").innerHTML = "";
  data.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
                <div class="card h-96  bg-base-100 shadow-xl">
            <figure class="h-[60%]" ><img  class="h-[100%]" src="${
              video?.thumbnail
            }" alt="Shoes" />
            </figure>
            <div class="flex">
                <div class="flex items-center rounded-full  w-[20%]">
                    <img class=" rounded-full"
                        src="${video?.authors[0]?.profile_picture}" alt="">
                </div>
                <div class="card-body flex flex-col justify-start w-[80%] ">
                    <h2 class="card-title">${video?.title}</h2>
                    <p>${video?.authors[0].profile_name}</p>
                    <p>${video?.others?.views || "No Views"}</p>
                </div>
            </div>
        </div>
    `;
    getById("video-container").appendChild(div);
  });
};
getCategory();
getCategoryId(selectedId, isSorted);
