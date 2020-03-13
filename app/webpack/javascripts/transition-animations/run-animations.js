export default function runAnimations(elList, type) {
  let animationsFinished = 0;
  const totalAnimations = elList.length;

  $(elList).each((ind, el) => {
    $(el).addClass($(el).attr(`data-animate-${type}`));

    $(el).one(
      'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
      function() {
        animationsFinished++;
        checkForAllFinished(el);
      }
    );
  });

  function checkForAllFinished(el) {
    if (animationsFinished === totalAnimations) {
      const event = new CustomEvent(`animationEnd${type}`, {
        bubbles: true,
        cancelable: true
      });

      el.dispatchEvent(event);
    }
  }
}
