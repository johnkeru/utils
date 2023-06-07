const upload = () => {
  const uploadURL = "https://api.cloudinary.com/v1_1/<use yours>/image/upload";
  const uploadPreset = "<use ur own preset :>";

  const uploadedImages = [];

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", uploadURL, false); // synchronous request
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const imageUrl = response.secure_url;
          uploadedImages.push(imageUrl);
        }
      };
      xhr.send(formData);
    }

    console.log(uploadedImages);
  } catch (error) {
    console.error("An error occurred during the upload:", error);
  }
};


