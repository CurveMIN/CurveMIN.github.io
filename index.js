document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('profilePhotoTrigger');
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('photoModalImg');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomLevelLabel = document.getElementById('zoomLevel');
  const closeEls = modal.querySelectorAll('[data-close]');

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;
  const STEP = 0.2;
  let scale = 1;

  function setScale(next) {
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    modalImg.style.transform = `scale(${scale})`;
    zoomLevelLabel.textContent = `${Math.round(scale * 100)}%`;
  }

  function openModal() {
    setScale(1);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  closeEls.forEach((el) => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  zoomInBtn.addEventListener('click', () => setScale(scale + STEP));
  zoomOutBtn.addEventListener('click', () => setScale(scale - STEP));

  modalImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    setScale(scale + (e.deltaY < 0 ? STEP : -STEP));
  }, { passive: false });
});
