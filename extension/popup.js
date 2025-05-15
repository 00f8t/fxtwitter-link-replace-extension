const replaceToggle = document.getElementById('replaceToggle');
const kavetskyToggle = document.getElementById('kavetskyToggle');

// Завантаження налаштувань із chrome.storage при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['replaceToggle', 'kavetskyToggle'], (result) => {
    replaceToggle.checked = result.replaceToggle ?? false;
    kavetskyToggle.checked = result.kavetskyToggle ?? false;
  });
});

// Збереження при зміні першого тумблера
replaceToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ replaceToggle: replaceToggle.checked });
});

// Збереження при зміні другого тумблера
kavetskyToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ kavetskyToggle: kavetskyToggle.checked });
});
