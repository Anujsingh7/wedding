// Wedding ceremony date: 10 December 2026 at 5:00 PM (17:00 IST)
const weddingDate = new Date("2026-12-10T17:00:00+05:30");

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();
  const note = document.getElementById("countdownNote");

  if (difference <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "0";
    });
    if (note) note.textContent = "Today is the auspicious day! Let the celebrations begin.";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Modern dynamic mobile navigation: Animated morph + click outside dismiss + keyboard escape
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  const toggleMenu = (shouldOpen) => {
    const isOpen = typeof shouldOpen === "boolean" 
      ? shouldOpen 
      : !navLinks.classList.contains("open");

    navLinks.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close smoothly when clicking any navigation link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // Dynamic logic: Click outside to dismiss the menu
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Dynamic logic: Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      toggleMenu(false);
    }
  });
}

// WhatsApp share: Sacred Blessing, Bride & Groom Name, Marriage Date, and Website Link
const shareWhatsAppBtn = document.getElementById("shareWhatsApp");
if (shareWhatsAppBtn) {
  shareWhatsAppBtn.addEventListener("click", () => {
    // Strip hash so guests open at the top of the invitation
    const shareUrl = window.location.href.split("#")[0];
    const message = `🌸 Wedding Invitation 🌸\n` +
      `॥ श्री गणेशाय नमः ॥\n\n` +
      `We warmly invite you to celebrate the wedding of\n` +
      `✨ Sandeep & Anchal ✨\n\n` +
      `📅 Marriage Date: 10 December 2026\n\n` +
      `Please join us and shower your warm blessings! 🙏\n\n` +
      `Invitation Link: ${shareUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

// Copy Plus Code Button
const copyPlusCodeBtn = document.getElementById("copyPlusCodeBtn");
const copyText = document.getElementById("copyText");
const copyIcon = document.getElementById("copyIcon");

if (copyPlusCodeBtn) {
  copyPlusCodeBtn.addEventListener("click", async () => {
    const code = copyPlusCodeBtn.getAttribute("data-code") || "7QM2+54M, Todarpur, Uttar Pradesh 221307";
    try {
      await navigator.clipboard.writeText(code);
      if (copyText) copyText.textContent = "Copied!";
      if (copyIcon) copyIcon.textContent = "✓";
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy Plus Code";
        if (copyIcon) copyIcon.textContent = "📋";
      }, 2500);
    } catch (err) {
      // Fallback
      const tempInput = document.createElement("input");
      tempInput.value = code;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      if (copyText) copyText.textContent = "Copied!";
      if (copyIcon) copyIcon.textContent = "✓";
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy Plus Code";
        if (copyIcon) copyIcon.textContent = "📋";
      }, 2500);
    }
  });
}

// Floating Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Wedding Song Audio Player & Disable Voice Toggle
const weddingAudio = document.getElementById("weddingAudio");
const musicWidget = document.getElementById("musicPlayerWidget");
const audioToggle = document.getElementById("audioToggle");
const musicStatusText = document.getElementById("musicStatusText");
const iconSoundOn = document.getElementById("iconSoundOn");
const iconSoundOff = document.getElementById("iconSoundOff");

function setAudioState(isPlaying) {
  if (!musicWidget || !audioToggle) return;

  if (isPlaying) {
    musicWidget.classList.add("is-playing");
    musicWidget.classList.remove("is-muted");
    audioToggle.setAttribute("aria-pressed", "true");
    audioToggle.setAttribute("title", "Click to pause / mute song");
    if (musicStatusText) musicStatusText.textContent = "Music On";
    if (iconSoundOn) iconSoundOn.style.display = "block";
    if (iconSoundOff) iconSoundOff.style.display = "none";
  } else {
    musicWidget.classList.remove("is-playing");
    musicWidget.classList.add("is-muted");
    audioToggle.setAttribute("aria-pressed", "false");
    audioToggle.setAttribute("title", "Click to play wedding song");
    if (musicStatusText) musicStatusText.textContent = "Play Song";
    if (iconSoundOn) iconSoundOn.style.display = "none";
    if (iconSoundOff) iconSoundOff.style.display = "block";
  }
}

if (weddingAudio && audioToggle) {
  // Comfortable initial volume
  weddingAudio.volume = 0.65;

  // Safe user activation events (no scroll, because scroll is NOT a user gesture)
  const activationEvents = ["pointerdown", "touchstart", "touchend", "mousedown", "click", "keydown"];

  const removeActivationListeners = () => {
    activationEvents.forEach(evt => {
      document.removeEventListener(evt, handleFirstGesture);
      window.removeEventListener(evt, handleFirstGesture);
    });
  };

  const handleFirstGesture = () => {
    if (!weddingAudio.paused) {
      removeActivationListeners();
      return;
    }

    weddingAudio.play().then(() => {
      setAudioState(true);
      removeActivationListeners();
    }).catch(() => {
      // Keep listening until a gesture succeeds
    });
  };

  // Attempt autoplay immediately upon load
  const attemptAutoplay = () => {
    const playPromise = weddingAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setAudioState(true);
        removeActivationListeners();
      }).catch(() => {
        // Autoplay blocked by browser policy: accurately display Play Song and listen for first touch anywhere
        setAudioState(false);
      });
    }
  };

  attemptAutoplay();
  window.addEventListener("DOMContentLoaded", attemptAutoplay, { once: true });
  window.addEventListener("load", attemptAutoplay, { once: true });

  // Attach gesture unlockers to document and window so ANY touch on the screen starts the song
  activationEvents.forEach(evt => {
    document.addEventListener(evt, handleFirstGesture, { passive: true });
    window.addEventListener(evt, handleFirstGesture, { passive: true });
  });

  // Explicit Toggle Button Click
  audioToggle.addEventListener("click", event => {
    event.stopPropagation();
    if (weddingAudio.paused) {
      weddingAudio.play().then(() => {
        setAudioState(true);
        removeActivationListeners();
      }).catch(err => {
        console.warn("Audio playback error:", err);
      });
    } else {
      weddingAudio.pause();
      setAudioState(false);
    }
  });

  // Keep state synchronized with real audio element events
  weddingAudio.addEventListener("play", () => setAudioState(true));
  weddingAudio.addEventListener("pause", () => setAudioState(false));

  // Seamless looping
  weddingAudio.addEventListener("ended", () => {
    weddingAudio.currentTime = 0;
    weddingAudio.play().catch(() => {});
  });
}

// Shower Blessings (Floating Flower Petals Effect 🌸)
const showerBlessingsBtn = document.getElementById("showerBlessingsBtn");
const petalsContainer = document.getElementById("petalsContainer");
const blessingsToast = document.getElementById("blessingsToast");

let toastTimeout = null;

function showBlessingsToast(message) {
  if (!blessingsToast) return;
  if (message) blessingsToast.textContent = message;
  blessingsToast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    blessingsToast.classList.remove("show");
  }, 3200);
}

function createPetal(isWelcome = false) {
  if (!petalsContainer) return;

  const petal = document.createElement("div");
  petal.className = "wedding-petal";

  // Palette of celebratory Indian wedding flower petals
  const colors = [
    "linear-gradient(135deg, #ff7a00, #ff4500)", // Marigold orange
    "linear-gradient(135deg, #ffd000, #ff9900)", // Genda yellow
    "linear-gradient(135deg, #e60039, #870020)", // Gulab red
    "linear-gradient(135deg, #ff6b8b, #c2185b)", // Deep rose pink
    "linear-gradient(135deg, #ffe082, #c9a45c)"  // Shimmering gold
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Randomized dimensions and natural organic shapes
  const width = Math.floor(Math.random() * 12) + 14; // 14px to 26px
  const height = Math.floor(Math.random() * 14) + 18; // 18px to 32px
  const startX = Math.random() * 96; // 0vw to 96vw
  const drift = (Math.random() - 0.5) * 40; // horizontal drift
  const endX = Math.min(98, Math.max(2, startX + drift));
  const rotationEnd = Math.floor(Math.random() * 720) - 360;
  const duration = (Math.random() * 2.8 + 3.2).toFixed(2); // 3.2s to 6.0s
  const delay = (Math.random() * (isWelcome ? 1.5 : 1.2)).toFixed(2);

  petal.style.width = `${width}px`;
  petal.style.height = `${height}px`;
  petal.style.background = color;
  petal.style.setProperty("--x-start", `${startX}vw`);
  petal.style.setProperty("--x-end", `${endX}vw`);
  petal.style.setProperty("--rot-end", `${rotationEnd}deg`);
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;

  // Organic petal curvature variations
  const radii = [
    "60% 0 60% 40%",
    "50% 50% 50% 10%",
    "70% 20% 70% 30%",
    "40% 60% 30% 70%"
  ];
  petal.style.borderRadius = radii[Math.floor(Math.random() * radii.length)];

  // Clean up on animation completion to prevent DOM bloat
  petal.addEventListener("animationend", () => {
    petal.remove();
  });

  petalsContainer.appendChild(petal);
}

function triggerPetalShower(count = 38, isWelcome = false) {
  for (let i = 0; i < count; i++) {
    createPetal(isWelcome);
  }
}

if (showerBlessingsBtn) {
  showerBlessingsBtn.addEventListener("click", () => {
    triggerPetalShower(42);
    showBlessingsToast("🌸 Heartfelt blessings showered on Sandeep & Anchal!");
  });
}

// Gentle welcome petal shower shortly after initial page load
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    triggerPetalShower(18, true);
  }, 1200);
});
