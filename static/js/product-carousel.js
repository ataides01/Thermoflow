(() => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const track = carousel.querySelector("[data-carousel-track]");
    const cards = Array.from(track.children);
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dots = carousel.querySelector("[data-carousel-dots]");
    const delay = Number(carousel.dataset.delay) || 3200;
    let index = 0;
    let visibleCards = 1;
    let timerId;

    const calculateVisibleCards = () => {
        const viewportWidth = carousel.querySelector(".product-carousel__viewport").clientWidth;
        const cardWidth = cards[0].getBoundingClientRect().width;
        visibleCards = Math.max(1, Math.round(viewportWidth / cardWidth));
    };

    const maxIndex = () => Math.max(0, cards.length - visibleCards);

    const buildDots = () => {
        dots.innerHTML = "";
        for (let dotIndex = 0; dotIndex <= maxIndex(); dotIndex += 1) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Ir para produto ${dotIndex + 1}`);
            dot.addEventListener("click", () => {
                goTo(dotIndex);
                restart();
            });
            dots.appendChild(dot);
        }
    };

    const update = () => {
        calculateVisibleCards();
        index = Math.min(index, maxIndex());
        const card = cards[index];
        track.style.transform = `translateX(-${card.offsetLeft}px)`;

        Array.from(dots.children).forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === index);
        });
    };

    const goTo = (nextIndex) => {
        index = nextIndex > maxIndex() ? 0 : nextIndex < 0 ? maxIndex() : nextIndex;
        update();
    };

    const next = () => goTo(index + 1);
    const previous = () => goTo(index - 1);

    const start = () => {
        timerId = window.setInterval(next, delay);
    };

    const stop = () => {
        window.clearInterval(timerId);
    };

    const restart = () => {
        stop();
        start();
    };

    prevButton.addEventListener("click", () => {
        previous();
        restart();
    });

    nextButton.addEventListener("click", () => {
        next();
        restart();
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    window.addEventListener("resize", () => {
        buildDots();
        update();
    });

    buildDots();
    update();
    start();
})();
