import runAnimations from './transition-animations/run-animations.js';

export default function setupTransition() {
  let _isAnimating = false;

  $(document).on('turbolinks:load', () => {
    _isAnimating = false;
  });

  $(document).on('turbolinks:before-visit', e => {
    if (!_isAnimating) {
      const els = $('[class*=animate]');
      removeAllAnimateClasses(els);

      const listToAnimate = $('[data-animate-out]');
      if (listToAnimate.length > 0) {
        console.log('Animating...');
        _isAnimating = true;
        // Prevent navigation
        e.preventDefault();
        // Get new url
        const newUrl = event.data.url;

        // Run animations
        runAnimations(listToAnimate, 'out');

        $(document).one('animationEndout', () => {
          console.log('All animations finished');
          // ESlint says TB undefined
          // eslint-disable-next-line
          Turbolinks.visit(newUrl);
          _isAnimating = false;
        });
      } else {
        console.log('No elements to animate');
      }
    } else {
      console.log('Not animating');
    }
  });

  $(document).on('turbolinks:before-cache', () => {
    const els = $('[data-animate-out]');

    removeAllAnimateClasses(els);
  });
}

function removeAllAnimateClasses(els) {
  $(els).removeClass(function(index, className) {
    return (className.match(/(^|\s)animate-\S+/g) || []).join(' ');
  });
}
