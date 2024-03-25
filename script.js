document.addEventListener("DOMContentLoaded", function () {
    async function fetchStoryContent(title) {
        try {
            const response = await fetch(`stories/${title}.txt`);
            const data = await response.text();
            return data;
        } catch (error) {
            console.error("Error fetching story content:", error);
            return "Error fetching story content.";
        }
    }

    async function displayStory(title) {
        const storyContent = await fetchStoryContent(title);
        document.getElementById("story-content").innerHTML = `<h2>${title.replace(/_/g, " ")}</h2><p>${storyContent}</p>`;
    }

    async function populateImageCoversAndTitles() {
        try {
            const response = await fetch("image_filenames.txt");
            const filenames = await response.text();
            const imageContainer = document.getElementById("image-container");
            const storiesList = document.getElementById("stories-list");
            filenames.split("\n").forEach(filename => {
                if (filename.trim() !== "") {
                    const title = filename.split(".")[0];
                    
                    const imgContainer = document.createElement("div");
                    imgContainer.classList.add("image-container");
                    imgContainer.setAttribute("data-title", title.replace(/_/g, " "));
                    
                    // Create title element
                    const titleElement = document.createElement("div");
                    titleElement.classList.add("image-title");
                    titleElement.innerText = title.replace(/_/g, " ");
                    imgContainer.appendChild(titleElement);
                    
                    // Create image element
                    const img = document.createElement("img");
                    img.src = `images/${filename.trim()}`;
                    img.alt = title;
                    img.classList.add("image-cover");
                    img.addEventListener("click", () => {
                        displayStory(title);
                        document.getElementById("selected-title").innerText = title.replace(/_/g, " ");
                    });
                    imgContainer.appendChild(img);
                    imageContainer.appendChild(imgContainer);

                    // Create list item for stories list
                    const listItem = document.createElement("li");
                    const storyLink = document.createElement("a");
                    storyLink.href = "#";
                    storyLink.innerText = title.replace(/_/g, " ");
                    storyLink.addEventListener("click", () => {
                        displayStory(title);
                        document.getElementById("selected-title").innerText = title.replace(/_/g, " ");
                    });
                    listItem.appendChild(storyLink);
                    storiesList.appendChild(listItem);
                }
            });
        } catch (error) {
            console.error("Error populating image covers:", error);
        }
    }

    populateImageCoversAndTitles();
});
