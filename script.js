    // Initialize Lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const scrollToTop = document.getElementById('scrollToTop');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Show/hide scroll to top button
            if (window.scrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    // Close mobile navbar if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if(navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                        navbarToggler.click();
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Scroll to top functionality
        document.getElementById('scrollToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = this.querySelector('input[type="text"]').value;
            
            // Create success message
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show position-fixed" 
                     style="top: 80px; right: 20px; z-index: 9999; min-width: 300px; max-width: 90%; box-shadow: 0 15px 50px rgba(0,0,0,0.3); border-radius: 20px; border: none; background: var(--gradient-primary); color: white;">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-check-circle fa-lg me-3"></i>
                        <div>
                            <h6 class="mb-1 fw-bold">Enquiry Submitted!</h6>
                            <p class="mb-0 small">Thank you ${firstName}. Our luxury consultant will contact you within 24 hours.</p>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            document.body.appendChild(successDiv);
            
            // Auto dismiss after 5 seconds
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if(alert) {
                    alert.classList.remove('show');
                    setTimeout(() => alert.remove(), 300);
                }
            }, 5000);
            
            // Reset form
            this.reset();
        });
        
        // Add animation to elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements for animation
        document.querySelectorAll('.gallery-item, .floorplan-card, .stat-card, .contact-info-item, .map-side-single-image').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
        
        // Add hover effects to floorplan cards
        document.querySelectorAll('.floorplan-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-20px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });