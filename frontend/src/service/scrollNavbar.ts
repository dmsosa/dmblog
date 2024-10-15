function scrollNavbar() {
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  let lastScroll = 0;
  const header = document.querySelector(".sticky-header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      header?.classList.remove(scrollUp);
      return;
    }
    if (currentScroll > lastScroll && !header?.classList.contains(scrollDown)) {
      header?.classList.remove(scrollUp);
      header?.classList.add(scrollDown);
    } else if (
      currentScroll < lastScroll &&
      header?.classList.contains(scrollDown)
    ) {
      header?.classList.remove(scrollDown);
      header?.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  });
}

export default scrollNavbar;
