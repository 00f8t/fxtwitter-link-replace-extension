console.log("🚀 FXTwitter link replacer завантажено!");

// Отримуємо режими із сховища
chrome.storage.sync.get(['replaceToggle', 'kavetskyToggle'], (result) => {
  MODE = result.replaceToggle ?? false;
  kavetskyMode = result.kavetskyToggle ?? false;
});

// Якщо в Bing не працює sync, можна спробувати local замість sync:
// chrome.storage.local.get(['replaceToggle', 'kavetskyToggle'], (result) => {
//   MODE = result.replaceToggle ?? false;
//   kavetskyMode = result.kavetskyToggle ?? false;
// });

const observer = new MutationObserver(() => {
  const menuItems = document.querySelectorAll('div[role="menuitem"]');


  if (MODE == true) {
    // Обробляємо кнопки, щоб додати подію заміни посилання при кліку
    menuItems.forEach((item) => {
      if (item.dataset.fxHandled) return;

      const text = item.innerText?.toLowerCase();
      const icon = item.querySelector('svg')?.outerHTML;

      const isCopyButton =
        text.includes("коп") || // "копіювати"
        (icon && icon.includes("link"));

      if (isCopyButton) {
        item.dataset.fxHandled = "true";
        item.addEventListener("click", () => {
          console.log("🔗 Кнопка копіювання натиснута, чекаємо буфер...");
          overrideClipboard();
        });
      }
    });
  }
  else {

    // --- ДОДАЄМО НОВУ КНОПКУ ЗІ СВОЄЮ ІКОНКОЮ ---

    if (document.querySelector("#my-copy-link-btn")) return;

    const firstBtn = menuItems[0];
    if (!firstBtn) return;

    const newBtn = firstBtn.cloneNode(true);
    newBtn.id = "my-copy-link-btn";

    const spanText = newBtn.querySelector("span.css-1jxf684");
    if (spanText) spanText.textContent = "Копіювати гарне посилання";

    const customIcon = `
    <svg viewBox="125 41 650 920" width="20" height="20" fill="currentColor" stroke-width="10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M365.625 957.5C349.0416666666667 955.6666666666666 338.1666666666667 951.25 324.125 940.7083333333334C306.0833333333333 927.125 294.75 906.5833333333334 291.8333333333333 882.2083333333334L290.9583333333333 875L267.0416666666667 875C240.9583333333334 875 224.0416666666667 873.0833333333334 211.0833333333333 868.625C167.625 853.75 136.625 818.5416666666666 127.5 773.6666666666666C125.0416666666667 761.7083333333334 125 755.875 125 459.0416666666666C125 131.25 124.6666666666667 147.3333333333335 131.6666666666667 126.8750000000001C146.0833333333333 84.5416666666667 181.0833333333333 53.6666666666667 225.4166666666667 44.0833333333334C235 42 252.125 41.875 500 41.875C747.875 41.875 764.9999999999999 42 774.5833333333333 44.0833333333334C818.9166666666666 53.6666666666667 853.9166666666666 84.5416666666667 868.3333333333333 126.8750000000001C875.3333333333333 147.3333333333335 875 131.25 875 459.0416666666666C875 755.875 874.9583333333333 761.7083333333334 872.5 773.6666666666666C863.375 818.5416666666666 832.375 853.75 788.9166666666666 868.625C775.9583333333334 873.0833333333334 759.0416666666665 875 732.9583333333334 875L709.0416666666666 875L708.1666666666665 882.2083333333334C704.5416666666666 912.5416666666666 687.875 936.5833333333334 660.9583333333333 950.1666666666666C644.7916666666666 958.2916666666666 651.5416666666666 957.9583333333334 506.25 958.2083333333334C433.7083333333333 958.375 370.4583333333333 958.0416666666666 365.625 957.5M625 833.125L625 791.25L500 791.25L375 791.25L375 833.125L375 875L500 875L625 875L625 833.125M291.9166666666667 783.4583333333334C294.25 763.0833333333334 301.4583333333333 748.5 316.8333333333333 733.0833333333334C329.375 720.5416666666667 340.2083333333333 714.1666666666667 355 710.7083333333334C367.2083333333333 707.8333333333334 632.7916666666666 707.8333333333334 645 710.7083333333334C659.7916666666666 714.1666666666667 670.6249999999999 720.5416666666667 683.1666666666666 733.0833333333334C698.5833333333333 748.5416666666667 705.7499999999999 763.0833333333334 708.125 783.5416666666666L708.9999999999999 791.4166666666666L735.4583333333333 791.0416666666667C761.2499999999999 790.625 762 790.5416666666667 768.1249999999999 787.2916666666666C776.0833333333334 783.0833333333334 783.0833333333333 776.0833333333334 787.2916666666666 768.125L790.625 761.875L790.9583333333333 460.375L791.2499999999999 158.9166666666668L788.7083333333333 152C785.2916666666666 142.9166666666668 776.6666666666666 133.5000000000001 767.7499999999999 129.1250000000001L760.6249999999999 125.6250000000001L500 125.6250000000001L239.375 125.6250000000001L232.25 129.1250000000001C223.3333333333334 133.5000000000001 214.7083333333333 142.9166666666668 211.2916666666667 152L208.75 158.9166666666668L209.0416666666667 460.375L209.375 761.875L212.7083333333334 768.125C218.2083333333333 778.5 228.0416666666667 786.8333333333334 238.75 790.0833333333334C240.4583333333333 790.625 252.9166666666667 791.0833333333334 266.4583333333333 791.125L291 791.25L291.9166666666667 783.4583333333334"/>
    </svg>
  `;
    const oldIcon = newBtn.querySelector("svg");
    if (oldIcon) oldIcon.outerHTML = customIcon;

    newBtn.addEventListener("click", () => {
      console.log("🆕 Моя кнопка копіювання натиснута");
      overrideClipboard();
    });

    const menuContainer = firstBtn.parentElement;
    if (menuContainer) {
      menuContainer.insertBefore(newBtn, menuContainer.firstChild);
    }
  }
});

observer.observe(document, {
  subtree: true,
  childList: true,
});

async function overrideClipboard() {
  try {
    const url = await navigator.clipboard.readText();
    if (url.includes("x.com")) {
      const newUrl = replaceLink(url);
      await navigator.clipboard.writeText(newUrl);
      console.log(`✅ Посилання замінено: ${newUrl}`);
    }
  } catch (err) {
    console.error("❌ Clipboard error:", err);
  }
}

function replaceLink(link) {
  if (kavetskyMode)
    newLink = "hitlerx.com"
  else
    newLink = "fxtwitter.com"

  if (link.includes(newLink)) return link; // вже оброблено
  return link.replace("x.com", newLink);
}
