let styleCache = {};
export default function runAnimations(elList) {
  let animationsFinished = 0;
  const totalAnimations = elList[1].length + elList[2].length;

  // *** Fire revert animations *** \\
  // If there's a revert el & styles in cache
  if (elList[0].length && Object.keys(styleCache).length > 0) {
    const targetRevertEl = $(elList)[0][0];

    $(targetRevertEl).removeAttr('data-animate-out');

    const newNode = $(targetRevertEl).clone();
    $(newNode).attr('data-delete-on-load', '');
    $('body').append(newNode);
    $(targetRevertEl).hide();

    $(newNode).animate(styleCache, 10);

    styleCache = {};
  }

  // *** Fire custom animations *** \\
  $(elList[1]).each((ind, el) => {
    const animationName = $(el).attr('data-custom-animation');
    const targetElName = $(el).attr('data-custom-animation-target');
    const targetEl = $(`#${targetElName}`)[0];

    // Get position of el to copy
    const posTop = $(targetEl).offset().top;
    const posLeft = $(targetEl).offset().left;
    const width = $(targetEl).width();
    const height = $(targetEl).height();

    // Clone el
    const newNode = $(targetEl).clone();

    // Cache & apply css
    styleCache = {
      position: 'absolute',
      top: posTop,
      left: posLeft,
      width: width,
      height: height
    };

    $(newNode).css(styleCache);

    $(newNode).attr('data-custom-node');
    // Append
    $('body').append(newNode);

    // Add event listener
    $(newNode).one(
      'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
      function() {
        animationsFinished++;
        checkForAllFinished(targetEl);
      }
    );

    // Run animation
    $(newNode).addClass(animationName);
  });

  // *** Fire general animations *** \\
  let timer = 0;
  $(elList[2]).each((ind, el) => {
    $(el).one(
      'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
      () => {
        animationsFinished++;
        checkForAllFinished(el);
      }
    );

    setTimeout(() => {
      $(el).addClass($(el).attr('data-animate-out'));
    }, timer);
    timer += 100;
  });

  // Fire event once all animations have finished
  function checkForAllFinished(el) {
    if (animationsFinished === totalAnimations) {
      console.log('Check finished');
      const event = new CustomEvent(`allAnimationEnd`, {
        bubbles: true,
        cancelable: true
      });

      el.dispatchEvent(event);
    }
  }
}
