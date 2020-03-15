import runAnimations from './transition-animations/run-animations.js';

export default function setupTransition() {
  let _isAnimating = false;
  // Create list of el nodes to animate
  let listToAnimate = [[], []];

  $(document).on('turbolinks:load', () => {
    _isAnimating = false;
  });

  $(document).on('turbolinks:before-visit', e => {
    if (!_isAnimating) {
      _isAnimating = true;

      // Prevent navigation
      e.preventDefault();

      // Get new url
      const newUrl = event.data.url;

      // Remove any trailing animation classes
      const els = $('[class*=animate]');
      removeAllAnimateClasses(els);

      // *** Custom animations *** \\
      addCustomElToList(event);

      // *** General animations *** \\
      addGeneralElsToList();

      // Run animations
      runAnimations(listToAnimate);

      $(document).one('animationEndOut', () => {
        console.log('ANIMATION END EVENT');
        // ESlint says TB undefined
        // eslint-disable-next-line
        Turbolinks.visit(newUrl);
        _isAnimating = false;
      });
    } else {
      console.log('Not animating');
    }
  });

  // Clean up function
  $(document).on('turbolinks:before-cache', () => {
    const els = $('[data-animate-out]');
    removeAllAnimateClasses(els);
  });

  function addCustomElToList(event) {
    // Get element that triggered page load
    const el = event.target.activeElement;

    if ($(el).attr('data-custom-animation')) {
      listToAnimate[0].push(el);
    }
  }

  function addGeneralElsToList() {
    const generalAnimationList = $('[data-animate-out]');

    if (generalAnimationList.length > 0) {
      $(generalAnimationList).each((ind, el) => {
        listToAnimate[1].push(el);
      });
    }
  }
}

// Utility functions

function removeAllAnimateClasses(els) {
  $(els).removeClass(function(index, className) {
    return (className.match(/(^|\s)animate-\S+/g) || []).join(' ');
  });
}
