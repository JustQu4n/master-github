  // Profile Popup Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const profileAvatar = document.getElementById('profileAvatarNav');
            const profilePopup = document.getElementById('profilePopup');
            
            profileAvatar.addEventListener('click', function(e) {
                e.stopPropagation();
                profilePopup.style.display = profilePopup.style.display === 'none' ? 'block' : 'none';
            });
            
            document.addEventListener('click', function(e) {
                if (!profilePopup.contains(e.target) && e.target !== profileAvatar) {
                    profilePopup.style.display = 'none';
                }
            });
            
            // Tab Switching
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Here you would add logic to show the relevant content
                    const tabId = this.dataset.tab;
                    console.log(`Tab ${tabId} clicked`);
                });
            });
            
            // Post Modal
            const postItems = document.querySelectorAll('.post-item');
            const modal = document.getElementById('postModal');
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            const closeBtn = document.querySelector('.close');
            
            postItems.forEach(post => {
                post.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    const postType = this.dataset.type;
                    
                    modalImage.src = imgSrc;
                    
                    // Set caption based on post type
                    if (postType === 'certificate') {
                        modalCaption.innerHTML = '<p><strong>your_portfolio</strong> Chứng chỉ mới nhất của tôi - Professional Developer Certification</p>';
                    } else {
                        modalCaption.innerHTML = '<p><strong>your_portfolio</strong> Dự án mới nhất của tôi - Ứng dụng web full-stack với React và Node.js</p>';
                    }
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                });
            });
            
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Allow scrolling again
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });