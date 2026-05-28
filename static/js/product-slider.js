(() => {
    const slider = document.querySelector("[data-product-slider]");
    if (!slider) return;

    const track = slider.querySelector("[data-product-track]");
    const cards = Array.from(track.children);
    const prev = slider.querySelector("[data-product-prev]");
    const next = slider.querySelector("[data-product-next]");
    let activeIndex = 0;
    let timerId;

    const getVisibleCount = () => {
        if (window.matchMedia("(max-width: 560px)").matches) return 1;
        if (window.matchMedia("(max-width: 900px)").matches) return 2;
        return 4;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCount());

    const update = () => {
        activeIndex = Math.min(activeIndex, getMaxIndex());
        track.style.transform = `translateX(-${cards[activeIndex].offsetLeft}px)`;
    };

    const goTo = (index) => {
        activeIndex = index > getMaxIndex() ? 0 : index < 0 ? getMaxIndex() : index;
        update();
    };

    const restart = () => {
        window.clearInterval(timerId);
        timerId = window.setInterval(() => goTo(activeIndex + 1), 2800);
    };

    prev.addEventListener("click", () => {
        goTo(activeIndex - 1);
        restart();
    });

    next.addEventListener("click", () => {
        goTo(activeIndex + 1);
        restart();
    });

    window.addEventListener("resize", update);
    update();
    restart();
})();
