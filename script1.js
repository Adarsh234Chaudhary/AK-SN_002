document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.parentElement;
      const popup = parent.querySelector('.details-popup');

      // Close any other open popups first
      document.querySelectorAll('.details-popup.open').forEach(openPopup => {
        if (openPopup !== popup) {
          openPopup.classList.remove('open');
        }
      });

      // Toggle current popup
      popup.classList.toggle('open');
    });
  });

  // Optional: close the popups if clicked outside
  document.addEventListener('click', (e) => {
    if (![...document.querySelectorAll('.nav-item')].some(item => item.contains(e.target))) {
      document.querySelectorAll('.details-popup.open').forEach(openPopup => {
        openPopup.classList.remove('open');
      });
    }
  });
});
