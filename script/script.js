// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const postsGrid = document.getElementById("posts-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Handle different tab content
      const tabType = this.getAttribute("data-tab");
      handleTabChange(tabType);
    });
  });

  function handleTabChange(tabType) {
    const posts = document.querySelectorAll(".post-item");

    switch (tabType) {
      case "posts":
        posts.forEach((post) => {
          post.style.display = "block";
        });
        break;
      case "reels":
        posts.forEach((post) => {
          if (post.getAttribute("data-type") === "project") {
            post.style.display = "block";
          } else {
            post.style.display = "none";
          }
        });
        break;
      case "tagged":
        posts.forEach((post) => {
          if (post.getAttribute("data-type") === "certificate") {
            post.style.display = "block";
          } else {
            post.style.display = "none";
          }
        });
        break;
    }
  }

  // Modal functionality
  const modal = document.getElementById("postModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.querySelector(".close");
  const posts = document.querySelectorAll(".post-item");

  // Post captions data
  const postCaptions = {
    project: [
      "Dự án E-commerce Website - Ứng dụng web bán hàng trực tuyến với React, Node.js và MongoDB. Tích hợp thanh toán online và quản lý đơn hàng.",
      "Mobile App Development - Ứng dụng di động đa nền tảng sử dụng React Native. Tính năng đăng nhập, chat realtime và push notification.",
      "Dashboard Analytics - Bảng điều khiển phân tích dữ liệu với React và D3.js. Hiển thị biểu đồ thống kê và báo cáo chi tiết.",
      "Web Application - Ứng dụng web quản lý công việc với tính năng kéo thả, thông báo realtime và làm việc nhóm.",
      "Data Visualization - Dự án trực quan hóa dữ liệu lớn sử dụng Python, Pandas và Plotly. Phân tích xu hướng và dự đoán.",
      "AI Project - Ứng dụng trí tuệ nhân tạo nhận diện hình ảnh sử dụng TensorFlow và OpenCV. Độ chính xác 95%.",
    ],
    certificate: [
      "React Professional Certificate - Hoàn thành khóa học React chuyên sâu với điểm số xuất sắc. Nắm vững Hooks, Context API và Redux.",
      "JavaScript Advanced Certificate - Chứng chỉ JavaScript nâng cao bao gồm ES6+, Async/Await, và Design Patterns.",
      "Node.js Backend Certificate - Chứng chỉ phát triển backend với Node.js, Express, và cơ sở dữ liệu MongoDB.",
    ],
  };

  posts.forEach((post, index) => {
    post.addEventListener("click", function () {
      const img = this.querySelector("img");
      const type = this.getAttribute("data-type");

      modalImage.src = img.src;
      modalImage.alt = img.alt;

      // Set appropriate caption based on post type
      let captionIndex = 0;
      if (type === "project") {
        captionIndex = Math.floor(Math.random() * postCaptions.project.length);
        modalCaption.innerHTML = `<p><strong>your_portfolio</strong> ${postCaptions.project[captionIndex]}</p>`;
      } else if (type === "certificate") {
        captionIndex = Math.floor(
          Math.random() * postCaptions.certificate.length
        );
        modalCaption.innerHTML = `<p><strong>your_portfolio</strong> ${postCaptions.certificate[captionIndex]}</p>`;
      }

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal functionality
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Like button functionality
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.querySelector(".fa-heart")) {
        const icon = this.querySelector("i");
        if (icon.classList.contains("far")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
          icon.style.color = "#ed4956";

          // Add animation
          icon.style.transform = "scale(1.3)";
          setTimeout(() => {
            icon.style.transform = "scale(1)";
          }, 200);
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          icon.style.color = "";
        }
      }

      if (this.querySelector(".fa-bookmark")) {
        const icon = this.querySelector("i");
        if (icon.classList.contains("far")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
        }
      }
    });
  });

  // Follow button functionality
  const followButtons = document.querySelectorAll(
    ".btn-primary, .modal-follow"
  );
  followButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent.trim() === "Theo dõi") {
        this.textContent = "Đang theo dõi";
        this.style.background = "transparent";
        this.style.color = "var(--text-primary)";
        this.style.border = "1px solid var(--border-color)";
      } else {
        this.textContent = "Theo dõi";
        this.style.background = "var(--primary-color)";
        this.style.color = "var(--white)";
        this.style.border = "none";
      }
    });
  });

  // Highlight click functionality
  const highlights = document.querySelectorAll(".highlight-item");
  highlights.forEach((highlight, index) => {
    highlight.addEventListener("click", function () {
      const label = this.querySelector(".highlight-label").textContent;

      // Filter posts based on highlight
      switch (label) {
        case "Dự án":
          showPostsByType("project");
          break;
        case "Chứng chỉ":
          showPostsByType("certificate");
          break;
        case "Kỹ năng":
        case "Về tôi":
          // Show all posts for these highlights
          showPostsByType("all");
          break;
      }

      // Scroll to posts section
      document.querySelector(".posts-grid").scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  function showPostsByType(type) {
    const posts = document.querySelectorAll(".post-item");

    posts.forEach((post) => {
      if (type === "all" || post.getAttribute("data-type") === type) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });

    // Update active tab
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    if (type === "project") {
      document.querySelector('[data-tab="reels"]').classList.add("active");
    } else if (type === "certificate") {
      document.querySelector('[data-tab="tagged"]').classList.add("active");
    } else {
      document.querySelector('[data-tab="posts"]').classList.add("active");
    }
  }

  // Smooth scrolling for profile stats
  const stats = document.querySelectorAll(".stat");
  stats.forEach((stat) => {
    const number = stat.querySelector(".stat-number");
    const finalNumber = parseInt(
      number.textContent.replace("k", "000").replace(".", "")
    );

    // Animate number counting (optional enhancement)
    stat.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    stat.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add loading effect to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    // Trigger load event if image is already cached
    if (img.complete) {
      img.style.opacity = "1";
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for scroll animation
  const animatedElements = document.querySelectorAll(
    ".post-item, .highlight-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Handle keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });

  // Double tap to like on mobile
  let lastTap = 0;
  posts.forEach((post) => {
    post.addEventListener("touchend", function (e) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        e.preventDefault();

        // Create heart animation
        const heart = document.createElement("i");
        heart.className = "fas fa-heart";
        heart.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #ed4956;
                    font-size: 60px;
                    pointer-events: none;
                    z-index: 100;
                    animation: heartPop 0.8s ease forwards;
                `;

        // Add heart animation keyframes to document
        if (!document.querySelector("#heartAnimation")) {
          const style = document.createElement("style");
          style.id = "heartAnimation";
          style.textContent = `
                        @keyframes heartPop {
                            0% {
                                transform: translate(-50%, -50%) scale(0);
                                opacity: 1;
                            }
                            50% {
                                transform: translate(-50%, -50%) scale(1.2);
                                opacity: 1;
                            }
                            100% {
                                transform: translate(-50%, -50%) scale(1);
                                opacity: 0;
                            }
                        }
                    `;
          document.head.appendChild(style);
        }

        this.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 800);
      }

      lastTap = currentTime;
    });
  });
});

const avatarNav = document.getElementById("profileAvatarNav");
const popup = document.getElementById("profilePopup");
avatarNav.addEventListener("click", function (e) {
  e.stopPropagation();
  popup.style.display = popup.style.display === "none" ? "block" : "none";
});
document.addEventListener("click", function (e) {
  if (!avatarNav.contains(e.target) && !popup.contains(e.target)) {
    popup.style.display = "none";
  }
});
