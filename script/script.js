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
});
