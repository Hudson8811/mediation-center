window.addEventListener('load', () => {
  const html = document.documentElement;
  const header = document.querySelector('.header');
  const toggleBtn = document.querySelector('.header__toggle');
  const canvas = document.querySelector('.header__mobile-canvas');
  const toggleBtnActiveClass = 'header__toggle--opened';
  const canvasActiveClass = 'header__mobile-canvas--opened';
  const canvasMobileClass = 'mobile';
  const breakpoint = 767;
  let isOpen = false;

  if (header && toggleBtn && canvas) {
    if (html.clientWidth <= breakpoint) {
      canvas.classList.add(canvasMobileClass);
    }

    toggleBtn.addEventListener('click', e => {
      if (isOpen) {
        closeMenu();
      } else {
        toggleBtn.classList.add(toggleBtnActiveClass);
        canvas.classList.add(canvasActiveClass);
        header.append(setOverlay(closeMenu));
        isOpen = true;
      }
    });

    window.addEventListener('resize', () => {
      if (html.clientWidth > breakpoint) {
        canvas.classList.remove(canvasMobileClass);
        closeMenu();
      } else {
        canvas.classList.add(canvasMobileClass);
      }
    })
  }


  function closeMenu() {
    toggleBtn.classList.remove(toggleBtnActiveClass);
    canvas.classList.remove(canvasActiveClass);
    isOpen = false;

    const overlay = document.querySelector('.overlay');

    if (overlay) {
      overlay.remove();
    }

  }

  function setOverlay(cb) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.addEventListener('click', cb);

    return overlay;
  }
});