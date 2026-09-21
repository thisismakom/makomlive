(async function () {
  try {
    const response = await fetch('/content/site.json', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    const get = (path) => path.split('.').reduce((o, k) => o && o[k], data);
    document.querySelectorAll('[data-content]').forEach((el) => {
      const value = get(el.dataset.content);
      if (value !== undefined && value !== null) el.textContent = value;
    });
    const eventCta = document.getElementById('event-cta');
    if (eventCta && data.event && data.event.button_url) eventCta.href = data.event.button_url;
  } catch (e) {
    console.warn('MAKOM content file could not be loaded.', e);
  }
})();
