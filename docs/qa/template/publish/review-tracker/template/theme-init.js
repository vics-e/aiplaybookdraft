// Apply the saved theme before the page paints (light by default).
  try {
    const t = localStorage.getItem('qa-tracker-theme');
    if (t !== 'light') document.documentElement.dataset.theme = 'dark';
  } catch {}
