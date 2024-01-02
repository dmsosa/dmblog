const body = document.body;
const scrollUp = "scroll-up"
const scrollDown = "scroll-down"
var lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
    } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown) 
    ) {
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;

})