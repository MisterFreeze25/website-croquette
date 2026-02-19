const BREAKPOINTS = { mobile: 768, tablet: 1280 };

function injectHamburger() {
  const btn = document.createElement("button");
  btn.id = "hamburger-btn";
  btn.setAttribute("aria-label", "Ouvrir le menu");
  btn.innerHTML = `<span></span><span></span><span></span>`;
  btn.style.cssText =
    "display:none;flex-direction:column;gap:6px;cursor:pointer;background:none;border:none;padding:4px;margin-left:16px;";

  btn.querySelectorAll("span").forEach((s) => {
    s.style.cssText =
      "display:block;width:24px;height:2px;background:white;border-radius:2px;transition:transform 0.3s,opacity 0.3s;";
  });

  const overlay = document.createElement("div");
  overlay.id = "mobile-overlay";
  overlay.style.cssText =
    "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.97);z-index:999;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;";

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&#10005;";
  closeBtn.style.cssText =
    "position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:white;font-size:1.8rem;cursor:pointer;line-height:1;";
  closeBtn.addEventListener("click", closeMenu);
  overlay.appendChild(closeBtn);

  document.querySelectorAll("nav ul li a").forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.textContent.trim();
    a.style.cssText =
      "color:white;text-decoration:none;font-size:1.5rem;font-weight:500;transition:color 0.3s ease;";

    a.addEventListener("mouseenter", () => {
      a.style.color = "#fde047";
    });

    a.addEventListener("mouseleave", () => {
      a.style.color = "white";
    });

    a.addEventListener("click", closeMenu);
    overlay.appendChild(a);

    link.style.transition = "color 0.3s ease";

    link.addEventListener("mouseenter", () => {
      link.style.color = "#fde047";
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = "white";
    });
  });

  document.body.appendChild(overlay);
  document.querySelector("nav").appendChild(btn);

  function openMenu() {
    overlay.style.display = "flex";
    const [b1, b2, b3] = btn.querySelectorAll("span");
    b1.style.transform = "translateY(8px) rotate(45deg)";
    b2.style.opacity = "0";
    b2.style.transform = "scaleX(0)";
    b3.style.transform = "translateY(-8px) rotate(-45deg)";
  }

  function closeMenu() {
    overlay.style.display = "none";
    const [b1, b2, b3] = btn.querySelectorAll("span");
    b1.style.transform = "none";
    b2.style.opacity = "1";
    b2.style.transform = "none";
    b3.style.transform = "none";
  }

  btn.addEventListener("click", () =>
    overlay.style.display === "flex" ? closeMenu() : openMenu(),
  );
}

function applyResponsive() {
  const w = window.innerWidth;
  const isMobile = w < BREAKPOINTS.mobile;
  const isTablet = w >= BREAKPOINTS.mobile && w < BREAKPOINTS.tablet;
  const isDesktop = w >= BREAKPOINTS.tablet;

  const nav = document.querySelector("nav");
  const navUl = document.querySelector("nav ul");
  const logo = document.querySelector("nav img:first-child");
  const cartImg = document.querySelector("nav img:last-child");
  const heroText = document.querySelector(".text-white.mt-48");
  const heroH1 = document.querySelector(".text-white.mt-48 h1");
  const dogImg = document.querySelector("img[src='images/chien.png']");
  const hamburgerBtn = document.getElementById("hamburger-btn");

  if (nav)
    nav.style.cssText =
      "display:flex;align-items:center;justify-content:space-between;";

  if (logo)
    logo.style.width = isMobile ? "120px" : isTablet ? "170px" : "320px";

  if (navUl)
    navUl.style.cssText = isDesktop
      ? "display:flex;flex:1;justify-content:center;list-style:none;margin:0;padding:0;"
      : "display:none;";

  if (cartImg)
    cartImg.style.cssText = "display:block;width:32px;cursor:pointer;";

  if (hamburgerBtn) hamburgerBtn.style.display = isDesktop ? "none" : "flex";

  if (heroText) {
    heroText.style.marginTop = isMobile ? "3rem" : isTablet ? "6rem" : "12rem";
    heroText.style.maxWidth = isMobile ? "100%" : "576px";
    heroText.style.textAlign = isMobile ? "center" : "left";
    heroText.style.width = "100%";
    heroText.style.boxSizing = "border-box";
  }

  if (heroH1) {
    heroH1.style.fontSize = isMobile ? "2rem" : isTablet ? "3rem" : "3.75rem";
    heroH1.style.lineHeight = "1.2";
    heroH1.style.wordBreak = "break-word";
  }

  if (dogImg) {
    if (isDesktop) {
      dogImg.style.cssText = "position:absolute;width:25%;bottom:0;right:0;";
    } else {
      dogImg.style.cssText = `display:block;width:${
        isMobile ? "85%" : "55%"
      };margin:2rem auto 0;position:relative;`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectHamburger();
  applyResponsive();
});

window.addEventListener("resize", applyResponsive);
