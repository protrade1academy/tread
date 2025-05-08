document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Chart
    if (document.getElementById('heroChart')) {
        const ctx = document.getElementById('heroChart').getContext('2d');
        const chartData = {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: 'Price',
                data: Array.from({length: 30}, () => Math.random() * 100 + 100),
                borderColor: '#2962FF',
                backgroundColor: 'rgba(41, 98, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };

        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });

        // Simulate real-time data updates
        setInterval(() => {
            chart.data.datasets[0].data.shift();
            const lastValue = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
            const change = (Math.random() - 0.5) * 2;
            chart.data.datasets[0].data.push(lastValue + change);
            chart.update();
        }, 1000);
    }

    // Animated Stats Counter
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValue = entry.target.querySelector('.stat-value');
                    const target = parseInt(statValue.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            statValue.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            statValue.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        statCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        testimonialsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('touchend', () => {
            isDown = false;
        });

        testimonialsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Stories Slider (same as testimonials)
    const storiesSlider = document.querySelector('.stories-slider');
    if (storiesSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        storiesSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - storiesSlider.offsetLeft;
            scrollLeft = storiesSlider.scrollLeft;
        });

        storiesSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        storiesSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        storiesSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - storiesSlider.offsetLeft;
            const walk = (x - startX) * 2;
            storiesSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        storiesSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - storiesSlider.offsetLeft;
            scrollLeft = storiesSlider.scrollLeft;
        });

        storiesSlider.addEventListener('touchend', () => {
            isDown = false;
        });

        storiesSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - storiesSlider.offsetLeft;
            const walk = (x - startX) * 2;
            storiesSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Course Filtering
    const categoryFilter = document.getElementById('category');
    const levelFilter = document.getElementById('level');
    const sortFilter = document.getElementById('sort');
    const courseCards = document.querySelectorAll('.course-card');

    if (categoryFilter && levelFilter && sortFilter && courseCards.length > 0) {
        function filterCourses() {
            const categoryValue = categoryFilter.value;
            const levelValue = levelFilter.value;
            const sortValue = sortFilter.value;
            
            let visibleCards = Array.from(courseCards).filter(card => {
                const categoryMatch = categoryValue === 'all' || card.getAttribute('data-category') === categoryValue;
                const levelMatch = levelValue === 'all' || card.getAttribute('data-level') === levelValue;
                return categoryMatch && levelMatch;
            });
            
            // Sorting
            visibleCards.sort((a, b) => {
                switch(sortValue) {
                    case 'popularity':
                        return parseInt(b.getAttribute('data-popularity')) - parseInt(a.getAttribute('data-popularity'));
                    case 'newest':
                        return parseInt(b.getAttribute('data-id')) - parseInt(a.getAttribute('data-id'));
                    case 'price-low':
                        return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
                    case 'price-high':
                        return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
                    case 'rating':
                        return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                    default:
                        return 0;
                }
            });
            
            // Hide all cards first
            courseCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show filtered and sorted cards
            visibleCards.forEach(card => {
                card.style.display = 'block';
            });
        }
        
        categoryFilter.addEventListener('change', filterCourses);
        levelFilter.addEventListener('change', filterCourses);
        sortFilter.addEventListener('change', filterCourses);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Market Data Ticker Animation
    const tickers = document.querySelectorAll('.ticker');
    if (tickers.length > 0) {
        function updatePrices() {
            tickers.forEach(ticker => {
                const priceElement = ticker.querySelector('.price');
                const changeElement = ticker.querySelector('.change');
                
                if (!priceElement || !changeElement) return;
                
                const currentPrice = parseFloat(priceElement.textContent);
                const change = (Math.random() - 0.5) * 0.5; // Random change between -0.5% and +0.5%
                const newPrice = currentPrice * (1 + change / 100);
                
                priceElement.textContent = newPrice.toFixed(changeElement.classList.contains('up') ? 2 : 0);
                
                // Update change percentage
                const changePercent = change.toFixed(2);
                changeElement.textContent = `${changePercent > 0 ? '+' : ''}${changePercent}%`;
                
                // Update classes based on change
                changeElement.classList.remove('up', 'down');
                if (change > 0) {
                    changeElement.classList.add('up');
                } else {
                    changeElement.classList.add('down');
                }
            });
        }
        
        setInterval(updatePrices, 3000);
    }

    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('.feature-card, .course-card, .value-card, .team-member, .faq-item', {
        interval: 200
    });

    scrollReveal.reveal('.about-content, .contact-grid', {
        interval: 200,
        origin: 'left'
    });

    scrollReveal.reveal('.about-image', {
        origin: 'right'
    });
});
