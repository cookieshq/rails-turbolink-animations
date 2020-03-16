export default function runAnimations(elList) {
  let animationsFinished = 0;
  const totalAnimations = elList.flat().length;
  let styleCache = {};

  // *** Fire custom animations *** \\
  $(elList[0]).each((ind, el) => {
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
  $(elList[1]).each((ind, el) => {
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

  function checkForAllFinished(el) {
    if (animationsFinished === totalAnimations) {
      const event = new CustomEvent(`allAnimationEnd`, {
        bubbles: true,
        cancelable: true
      });

      el.dispatchEvent(event);
    }
  }
}
