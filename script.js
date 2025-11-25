document.addEventListener('DOMContentLoaded', () => {

    // Existing smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Existing "Load More Articles" functionality
    const articlesContainer = document.getElementById('articlesContainer');
    const loadArticlesBtn = document.getElementById('loadArticlesBtn');

    const articlesData = [
        {
            title: "Aerodynamics: Shaping the Wind",
            description: "How a car's exterior is meticulously shaped to slice through the air, reducing drag and increasing efficiency.",
            link: "#"
        },
        {
            title: "The Evolution of Headlight Design",
            description: "From simple bulbs to intricate LED matrices, tracing the path of automotive lighting technology.",
            link: "#"
        },
        {
            title: "Material Science in Body Construction",
            description: "A look at the advanced materials like carbon fiber and high-strength steel that make modern cars safer and lighter.",
            link: "#"
        },
        {
            title: "Car Colors: Beyond Aesthetics",
            description: "Exploring the role of paint finishes in durability, perceived value, and brand identity.",
            link: "#"
        },
        {
            title: "Designing for Pedestrian Safety",
            description: "How exterior elements are engineered to mitigate injury in the event of a collision with a pedestrian.",
            link: "#"
        },
        {
            title: "The Art of Automotive Detailing",
            description: "Beyond a wash, detailing preserves and enhances the vehicle's aesthetic appeal and paintwork.",
            link: "#"
        },
        {
            title: "Autonomous Car Exteriors",
            description: "How sensors and lidar are being integrated into the exterior design of self-driving vehicles.",
            link: "#"
        }
    ];

    let articlesLoaded = 0;

    const loadMoreArticles = () => {
        const numToLoad = 3;
        const endIndex = articlesLoaded + numToLoad;

        for (let i = articlesLoaded; i < endIndex && i < articlesData.length; i++) {
            const article = articlesData[i];
            const articleCard = document.createElement('div');
            articleCard.classList.add('article-card');
            // The data-aos attribute is now controlled by the global AOS initialization check below
            articleCard.setAttribute('data-aos', 'fade-up'); 

            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.link}" class="read-more">Read More &rarr;</a>
            `;
            articlesContainer.appendChild(articleCard);
        }

        articlesLoaded = endIndex;

        if (loadArticlesBtn && articlesLoaded >= articlesData.length) {
            loadArticlesBtn.style.display = 'none';
            const noMoreMsg = document.createElement('p');
            noMoreMsg.textContent = "That's all for now! Check back for more.";
            noMoreMsg.style.textAlign = 'center';
            noMoreMsg.style.marginTop = 'var(--spacing-md)';
            noMoreMsg.style.color = 'var(--color-text-medium)';
            articlesContainer.appendChild(noMoreMsg);
        }
    };

    if (loadArticlesBtn) {
        loadArticlesBtn.addEventListener('click', loadMoreArticles);
        loadMoreArticles(); // Load initial articles on page load
    }

    // Updated gallery functionality with new images
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryImages = [
        { src: 'imgs/A futuristic car prototype.jpg', alt: 'A futuristic car prototype on a black background' },
        { src: 'imgs/The sleek profile of a vintage car.jpg', alt: 'The sleek profile of a vintage car' },
        { src: 'imgs/A car chassis being designed in a studio.jpg', alt: 'A car chassis being designed in a studio' },
        { src: 'imgs/Close-up of a luxury car headlight.jpg', alt: 'A close-up view of a luxury car headlight' },
        { src: 'imgs/A sports car speeding on a track.jpg', alt: 'A red sports car speeding on a race track' },
        { src: 'imgs/A concept car showcased under bright lights.jpg', alt: 'A concept car showcased under bright lights' },
        { src: 'imgs/car chassis.png.jpg', alt: 'A close-up on the complex parts of a car chassis' },
        { src: 'imgs/care tire.png.jpg', alt: 'Detailed view of a car rim and tire' },
    ];

    // Create lightbox elements
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.classList.add('lightbox-overlay');
    lightboxOverlay.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
    `;
    document.body.appendChild(lightboxOverlay);

    // Populate the gallery dynamically
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.setAttribute('data-aos', 'zoom-in');
        galleryItem.setAttribute('data-aos-delay', index * 100);
        galleryItem.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        galleryContainer.appendChild(galleryItem);

        // Add click event listener to open lightbox
        galleryItem.addEventListener('click', () => {
            const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxOverlay.classList.add('active');
        });
    });

    // Close lightbox when clicking outside the image or on the close button
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-close')) {
            lightboxOverlay.classList.remove('active');
        }
    });

    // --- NEW DESKTOP-ONLY AOS INITIALIZATION LOGIC ---
    const desktopBreakpoint = 992; 

    // Check if the current window width is equal to or greater than the desktop breakpoint
    if (window.innerWidth >= desktopBreakpoint) {
        // Initialize AOS only on desktop screens
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
}
    // ------------------------------------------
});
