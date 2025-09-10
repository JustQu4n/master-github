// Add this to your script2.js file or include it inline
document.addEventListener("DOMContentLoaded", function () {
  // Upload popup functionality
  const uploadPopupContainer = document.getElementById("uploadPopupContainer");
  const floatingUploadBtn = document.getElementById("floatingUploadBtn");
  const uploadCloseBtn = document.getElementById("uploadCloseBtn");
  const uploadCancelBtn = document.getElementById("uploadCancelBtn");
  const uploadSubmitBtn = document.getElementById("uploadSubmitBtn");
  const fileInput = document.getElementById("fileInput");
  const uploadArea = document.getElementById("uploadArea");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");
  const uploadPreview = document.getElementById("uploadPreview");
  const previewImage = document.getElementById("previewImage");
  const uploadChangeBtn = document.getElementById("uploadChangeBtn");
  const uploadBtn = document.querySelector(".upload-btn");

  // Open upload popup
  floatingUploadBtn.addEventListener("click", function () {
    uploadPopupContainer.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });

  // Close upload popup
  function closeUploadPopup() {
    uploadPopupContainer.classList.remove("active");
    document.body.style.overflow = ""; // Allow scrolling again
    resetUploadForm();
  }

  uploadCloseBtn.addEventListener("click", closeUploadPopup);
  uploadCancelBtn.addEventListener("click", closeUploadPopup);

  // Close when clicking outside the popup
  uploadPopupContainer.addEventListener("click", function (e) {
    if (e.target === uploadPopupContainer) {
      closeUploadPopup();
    }
  });

  // Handle file selection
  uploadBtn.addEventListener("click", function () {
    fileInput.click();
  });

  uploadChangeBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
        return;
      }

      if (!file.type.match("image.*")) {
        alert("Vui lòng chọn file hình ảnh.");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        uploadPlaceholder.style.display = "none";
        uploadPreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    }
  });

  // Reset the form
  function resetUploadForm() {
    fileInput.value = "";
    uploadPlaceholder.style.display = "flex";
    uploadPreview.style.display = "none";
    document.querySelector(".upload-form textarea").value = "";
    document.querySelector(
      'input[name="category"][value="project"]'
    ).checked = true;
  }

  // Handle drag and drop
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    uploadArea.classList.add("drag-over");
  }

  function unhighlight() {
    uploadArea.classList.remove("drag-over");
  }

  uploadArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      const file = files[0];

      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        alert("File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.");
        return;
      }

      if (!file.type.match("image.*")) {
        alert("Vui lòng chọn file hình ảnh.");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        uploadPlaceholder.style.display = "none";
        uploadPreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  uploadSubmitBtn.addEventListener("click", function () {
    // Check if image is selected
    if (fileInput.files.length === 0) {
      alert("Vui lòng chọn một hình ảnh.");
      return;
    }

    const description = document.querySelector(".upload-form textarea").value;
    const category = document.querySelector(
      'input[name="category"]:checked'
    ).value;

    // Here you would typically send the data to your server
    // For this demo, we'll just simulate a successful upload

    // Show loading state
    uploadSubmitBtn.disabled = true;
    uploadSubmitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';

    setTimeout(() => {
      // Create a new post and add it to the grid
      addNewPost(previewImage.src, description, category);

      // Reset and close the popup
      uploadSubmitBtn.disabled = false;
      uploadSubmitBtn.innerHTML = "Đăng bài";
      closeUploadPopup();

      // Show success message
      showNotification("Bài viết đã được đăng thành công!");
    }, 1500);
  });

  // Function to add new post to grid
  function addNewPost(imageSrc, description, category) {
    const postsGrid = document.getElementById("posts-content");

    // Create new post element
    const newPost = document.createElement("div");
    newPost.className = "post-item";
    newPost.setAttribute("data-type", category);

    // Set HTML content
    newPost.innerHTML = `
        <img src="${imageSrc}" alt="User Upload">
        <div class="post-overlay">
          <div class="post-stats">
            <span><i class="fas fa-heart"></i> 0</span>
            <span><i class="fas fa-comment"></i> 0</span>
          </div>
          ${
            category === "certificate"
              ? '<div class="certificate-badge"><i class="fas fa-certificate"></i></div>'
              : ""
          }
        </div>
      `;

    // Add click event to open modal
    newPost.addEventListener("click", function () {
      const modal = document.getElementById("postModal");
      const modalImage = document.getElementById("modalImage");
      const modalCaption = document.getElementById("modalCaption");

      modalImage.src = imageSrc;
      modalCaption.innerHTML = `<p><strong>your_portfolio</strong> ${
        description || "Bài viết mới"
      }</p>`;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    // Insert at the beginning of the grid
    postsGrid.insertBefore(newPost, postsGrid.firstChild);

    // Update the stat count
    const statNumber = document.querySelector(".stat-number");
    statNumber.textContent = parseInt(statNumber.textContent) + 1;
  }

  // Notification function
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        <div class="notification-content">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
        </div>
      `;

    // Add styles
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.background = "rgba(16, 185, 129, 0.9)";
    notification.style.color = "white";
    notification.style.padding = "12px 24px";
    notification.style.borderRadius = "30px";
    notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    notification.style.zIndex = "2000";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.justifyContent = "center";
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.3s ease";

    // Style notification content
    const notificationContent = notification.querySelector(
      ".notification-content"
    );
    notificationContent.style.display = "flex";
    notificationContent.style.alignItems = "center";
    notificationContent.style.gap = "8px";

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Periodically pulse the upload button to draw attention
  setInterval(() => {
    floatingUploadBtn.classList.add("pulse");
    setTimeout(() => {
      floatingUploadBtn.classList.remove("pulse");
    }, 1000);
  }, 5000);
});
