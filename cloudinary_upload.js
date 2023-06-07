const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // get the urls from cloudinary
    const uploadURL = "https://api.cloudinary.com/v1_1/kerutman/image/upload";
    const uploadPreset = "hcvgiane";

    const uploadedImages = [];

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

    const allData = { ...data, images: uploadedImages };
    // save everything to the mongodb
    setLoading(false);
  };
