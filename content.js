console.log("🚀 content.js loaded");

function replaceLink(link) {
  if (link.includes("fxtwitter.com")) return link; // вже оброблено
  return link
    .replace("x.com", "fxtwitter.com");
}


async function overrideClipboard() {
  try {
    const url = await navigator.clipboard.readText();
    if (url.includes("x.com") || url.includes("twitter.com")) {
      const newUrl = replaceLink(url);
      await navigator.clipboard.writeText(newUrl);
      console.log(`✅ Посилання замінено: ${newUrl}`);
    }
  } catch (err) {
    console.error("❌ Clipboard error:", err);
  }
}

const observer = new MutationObserver(() => {
  const menuItems = document.querySelectorAll('div[role="menuitem"]');

  menuItems.forEach((item) => {
    // Вже оброблено — пропускаємо
    if (item.dataset.fxHandled) return;

    const text = item.innerText?.toLowerCase();
    const icon = item.querySelector('svg')?.outerHTML;

    // Іконка у кнопки "копіювати" зазвичай з посиланням (link)
    const isCopyButton =
      text.includes("коп") || // укр/рос/англ "копіювати"/"копировать"/"copy"
      (icon && icon.includes("link"));

    if (isCopyButton) {
      item.dataset.fxHandled = "true";
      item.addEventListener("click", () => {
        console.log("🔗 Кнопка копіювання натиснута, чекаємо буфер...");
        setTimeout(overrideClipboard, 300);
      });
    }
  });
});

// Спостерігаємо за всім тілом сторінки
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
