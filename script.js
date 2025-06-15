document.addEventListener('DOMContentLoaded', () => {

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

    const loadArticlesBtn = document.getElementById('loadArticlesBtn');
    const articlesContainer = document.getElementById('articlesContainer');

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
        loadMoreArticles();
        loadArticlesBtn.addEventListener('click', loadMoreArticles);
    }
});
