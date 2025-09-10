// Profile Popup Toggle
document.addEventListener("DOMContentLoaded", function () {
  const profileAvatar = document.getElementById("profileAvatarNav");
  const profilePopup = document.getElementById("profilePopup");

  profileAvatar.addEventListener("click", function (e) {
    e.stopPropagation();
    profilePopup.style.display =
      profilePopup.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", function (e) {
    if (!profilePopup.contains(e.target) && e.target !== profileAvatar) {
      profilePopup.style.display = "none";
    }
  });

  // Tab Switching
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Here you would add logic to show the relevant content
      const tabId = this.dataset.tab;
      console.log(`Tab ${tabId} clicked`);
    });
  });

  // Post Modal
  const postItems = document.querySelectorAll(".post-item");
  const modal = document.getElementById("postModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".close");

  postItems.forEach((post) => {
    post.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const postType = this.dataset.type;

      modalImage.src = imgSrc;

      // Set caption based on post type
      if (postType === "certificate") {
        modalCaption.innerHTML =
          "<p><strong>your_portfolio</strong> Chứng chỉ mới nhất của tôi - Professional Developer Certification</p>";
      } else {
        modalCaption.innerHTML =
          "<p><strong>your_portfolio</strong> Dự án mới nhất của tôi - Ứng dụng web full-stack với React và Node.js</p>";
      }

      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Allow scrolling again
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
// Add this to your script2.js file or include it inline
document.addEventListener("DOMContentLoaded", function () {
  // Message popup functionality
  const messageToggle = document.getElementById("messageToggle");
  const messagePanel = document.getElementById("messagePanel");
  const messageClose = document.getElementById("messageClose");
  const chatBubble = document.getElementById("chatBubble");
  const chatMinimize = document.getElementById("chatMinimize");
  const messageItems = document.querySelectorAll(".message-item");

  // Toggle message panel
  messageToggle.addEventListener("click", function () {
    if (messagePanel.style.display === "flex") {
      messagePanel.style.display = "none";
    } else {
      messagePanel.style.display = "flex";
      chatBubble.style.display = "none";
    }
  });

  // Close message panel
  messageClose.addEventListener("click", function () {
    messagePanel.style.display = "none";
  });

  // Minimize chat bubble
  chatMinimize.addEventListener("click", function () {
    chatBubble.style.display = "none";
  });

  // Open chat when clicking on a message
  messageItems.forEach((item) => {
    item.addEventListener("click", function () {
      messagePanel.style.display = "none";
      chatBubble.style.display = "flex";

      // Remove unread class when opening chat
      this.classList.remove("unread");

      // Update message count
      updateMessageCount();
    });
  });

  // Update message count
  function updateMessageCount() {
    const unreadMessages = document.querySelectorAll(
      ".message-item.unread"
    ).length;
    const messageCount = document.querySelector(".message-count");

    if (unreadMessages > 0) {
      messageCount.textContent = unreadMessages;
      messageCount.style.display = "flex";
    } else {
      messageCount.style.display = "none";
    }
  }

  // Click outside to close panels
  document.addEventListener("click", function (e) {
    if (
      !messagePanel.contains(e.target) &&
      !messageToggle.contains(e.target) &&
      !chatBubble.contains(e.target)
    ) {
      messagePanel.style.display = "none";
    }
  });

  // Add functionality to send messages
  const chatInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".chat-input-btn:last-child");

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      const messagesContainer = document.querySelector(".chat-messages");
      const now = new Date();
      const time =
        now.getHours() +
        ":" +
        (now.getMinutes() < 10 ? "0" : "") +
        now.getMinutes();

      const messageElement = document.createElement("div");
      messageElement.className = "message-sent";
      messageElement.innerHTML = `
          <p>${message}</p>
          <span class="message-timestamp">${time}</span>
        `;

      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      chatInput.value = "";

      // Simulate response after 1-3 seconds
      setTimeout(() => {
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "message-received typing";
        typingIndicator.innerHTML = `
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          `;

        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
          messagesContainer.removeChild(typingIndicator);

          const responseElement = document.createElement("div");
          responseElement.className = "message-received";
          responseElement.innerHTML = `
              <p>Thanks for your message! I'll get back to you soon.</p>
              <span class="message-timestamp">${time}</span>
            `;

          messagesContainer.appendChild(responseElement);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
      }, 1000);
    }
  }

  // Create notification effect
  setTimeout(() => {
    if (
      messagePanel.style.display !== "flex" &&
      chatBubble.style.display !== "flex"
    ) {
      messageToggle.classList.add("pulse");

      setTimeout(() => {
        messageToggle.classList.remove("pulse");
      }, 1000);
    }
  }, 5000);
=======
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
