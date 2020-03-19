import runAnimations from './transition-animations/run-animations.js';

export default function setupTransition() {
  // State variables
  let _isAnimating = false;
  // Create list of el nodes to animate
  let elsToAnimate = [[], []];
  let elsToRevert = [];
  // Caches
  let urlCache;
  let styleCache = {};

  $(document).on('turbolinks:load', () => {
    _isAnimating = false;
  });

  $(document).on('turbolinks:before-render', () => {
    revertElements();
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

      getCustomRevertEls(newUrl);

      // *** Custom animations *** \\
      addCustomElToList(event);

      // *** General animations *** \\
      addGeneralElsToList();

      // Run animations
      runAnimations(elsToAnimate);

      $(document).one('allAnimationEnd', event => {
        navigateToNewPage(event, newUrl);
      });
    }
  });

  function revertElements() {
    if (elsToRevert.length) {
      // Get the new element to transition to
      const newBody = event.data.newBody;
      const prevId = $(elsToRevert)
        .eq(0)
        .attr('id');
      const elToReplace = $(newBody).find(`#${prevId}`)[0];

      if (elToReplace) {
        // Clone it
        const newEl = $(elsToRevert)
          .eq(0)
          .clone();
        // And add to body
        $(newBody).append(newEl);

        setTimeout(() => {
          // Get transition duration from elements css
          const duration =
            $(newEl)
              .css('transition-duration')
              .replace(/s/g, '') * 1000;

          // Use animate but to immediately apply styles to transition
          $(newEl).animate(styleCache, 0, null, function() {
            setTimeout(() => {
              // Remove element after it's finished transitioning
              $(this).remove();
            }, duration);
          });
          // Small delay here to ensure the animation fires
        }, 10);
      }
    }
    elsToRevert = [];
  }

  function getCustomRevertEls(newUrl) {
    // If user navigates back to prev page
    if ($('[data-revert-from-cache').length && urlCache === newUrl) {
      elsToRevert.push($('[data-revert-from-cache]')[0]);
    }
  }

  function addCustomElToList(event) {
    // Get element that triggered page load
    const el = event.target.activeElement;

    if ($(el).attr('data-custom-animation')) {
      elsToAnimate[0].push(el);
    }
  }

  function addGeneralElsToList() {
    const generalAnimationList = $('[data-animate-out]');

    if (generalAnimationList.length > 0) {
      $(generalAnimationList).each((ind, el) => {
        elsToAnimate[1].push(el);
      });
    }
  }

  function navigateToNewPage(event, newUrl) {
    urlCache = window.location.href;
    // ESlint says TB is undefined
    // eslint-disable-next-line
    Turbolinks.visit(newUrl);

    if (!$.isEmptyObject(event.detail)) {
      styleCache = event.detail;
    }
    _isAnimating = false;
    elsToAnimate = [[], []];
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
