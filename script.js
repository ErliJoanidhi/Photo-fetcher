document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://picsum.photos/367/300";
  const photoContainer = document.getElementById("photoContainer");
  const fetchButton = document.getElementById("fetch-button");
  const greyscaleCheckbox = document.getElementById("grayscale");
  const addMoreButton = document.getElementById("add-more-button");

  function fetchAndAppendImages(container, count) {
    for (let i = 0; i < count; i++) {
      fetch(baseURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.url;
        })
        .then((imageUrl) => {
          const photoItem = document.createElement("div");
          photoItem.classList.add("photo-item");

          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;

          const overlay = document.createElement("div");
          overlay.classList.add("photo-overlay");

          // Two lines of text in the overlay
          const line1 = document.createElement("div");
          line1.innerText = "Lucas Budimaier";

          const line2 = document.createElement("div");
          line2.innerText = "https://unsplash.com/photos/pwaaqfoMibl";
          line2.classList.add("small-text"); //class for smaller text

          overlay.appendChild(line1);
          overlay.appendChild(line2);

          photoItem.appendChild(imageElement);
          photoItem.appendChild(overlay);
          container.appendChild(photoItem);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }

  fetchAndAppendImages(photoContainer, 4); //initial fetch

  fetchButton.addEventListener("click", function () {
    photoContainer.innerHTML = ""; //remove current images
    fetchAndAppendImages(photoContainer, 4);
  });

  greyscaleCheckbox.addEventListener("change", function () {
    //toggle greyscale
    photoContainer.classList.toggle("greyscale", greyscaleCheckbox.checked);
  });

  addMoreButton.addEventListener("click", function () {
    fetchAndAppendImages(photoContainer, 4);
  });
});
