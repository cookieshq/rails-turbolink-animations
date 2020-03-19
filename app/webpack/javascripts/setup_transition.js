import runAnimations from './transition-animations/run-animations.js';

export default function setupTransition() {
  let _isAnimating = false;
  // Create list of el nodes to animate
  let listToAnimate = [[], [], []];
  let urlCache;
  let elsToRemove = [];

  $(document).on('turbolinks:load', () => {
    console.log('This fired');
    _isAnimating = false;

    setTimeout(() => {
      $(elsToRemove).each((ind, el) => {
        $(el).remove();
      });
      elsToRemove = [];
    }, 1000);
  });

  $(document).on('turbolinks:before-render', () => {
    const elsToRevert = $('[data-delete-on-load]');

    if (elsToRevert.length) {
      $(elsToRevert).each((ind, el) => {
        $(event.data.newBody).append(el);
        elsToRemove.push(el);
      });
    }
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

      addCustomRevertElToList(newUrl);

      // *** Custom animations *** \\
      addCustomElToList(event);

      // *** General animations *** \\
      addGeneralElsToList();

      // Run animations
      runAnimations(listToAnimate);

      $(document).one('allAnimationEnd', () => {
        urlCache = window.location.href;
        // ESlint says TB undefined
        // eslint-disable-next-line
        Turbolinks.visit(newUrl);
        console.log('Animation end fired');
        _isAnimating = false;
        listToAnimate = [[], [], []];
      });
    } else {
      console.log('Not animating');
    }
  });

  function addCustomRevertElToList(newUrl) {
    // If user navigates back to prev page
    if ($('[data-revert-from-cache').length && urlCache === newUrl) {
      listToAnimate[0].push($('[data-revert-from-cache]')[0]);
    }
  }

  function addCustomElToList(event) {
    // Get element that triggered page load
    const el = event.target.activeElement;

    if ($(el).attr('data-custom-animation')) {
      listToAnimate[1].push(el);
    }
  }

  function addGeneralElsToList() {
    const generalAnimationList = $('[data-animate-out]');

    if (generalAnimationList.length > 0) {
      $(generalAnimationList).each((ind, el) => {
        listToAnimate[2].push(el);
      });
    }
  }

  // Clean up function
  $(document).on('turbolinks:before-cache', () => {
    const els = $('[data-animate-out], [class*=animate-]');
    removeAllAnimateClasses(els);
    $('[data-revert-from-cache]').show();
  });
}

// Utility functions
function removeAllAnimateClasses(els) {
  $(els).removeClass(function(index, className) {
    return (className.match(/(^|\s)animate-\S+/g) || []).join(' ');
  });
}
