// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset to account for fixed header
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

    // Dynamic Content Loading for "Explore More Articles"
    const loadArticlesBtn = document.getElementById('loadArticlesBtn');
    const articlesContainer = document.getElementById('articlesContainer');

    // Array of dummy article data
    const articlesData = [
        {
            title: "Aerodynamics: Shaping the Wind",
            description: "How a car's exterior is meticulously shaped to slice through the air, reducing drag and increasing efficiency.",
            link: "#" // In a real app, this would be a link to the full article
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

    let articlesLoaded = 0; // Keep track of how many articles have been loaded

    const loadMoreArticles = () => {
        const numToLoad = 3; // Load 3 articles at a time
        const endIndex = articlesLoaded + numToLoad;

        for (let i = articlesLoaded; i < endIndex && i < articlesData.length; i++) {
            const article = articlesData[i];
            const articleCard = document.createElement('div');
            articleCard.classList.add('article-card');

            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.link}" class="read-more">Read More &rarr;</a>
            `;
            articlesContainer.appendChild(articleCard);
        }

        articlesLoaded = endIndex; // Update the count of loaded articles

        // Hide the button if all articles have been loaded
        if (loadArticlesBtn && articlesLoaded >= articlesData.length) { // Added null check for loadArticlesBtn
            loadArticlesBtn.style.display = 'none';
            // Optionally, add a message
            const noMoreMsg = document.createElement('p');
            noMoreMsg.textContent = "That's all for now! Check back for more.";
            noMoreMsg.style.textAlign = 'center';
            noMoreMsg.style.marginTop = 'var(--spacing-md)';
            noMoreMsg.style.color = 'var(--color-text-medium)';
            articlesContainer.appendChild(noMoreMsg);
        }
    };

    // Load initial articles when the page loads (optional, but good UX)
    if (loadArticlesBtn) {
        loadMoreArticles(); // Load some articles on initial page load
        loadArticlesBtn.addEventListener('click', loadMoreArticles);
    }
});