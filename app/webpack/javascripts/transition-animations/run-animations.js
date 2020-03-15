export default function runAnimations(elList) {
  //let animationsFinished = 0;
  const totalAnimations = elList.flat().length;

  console.log('El list is ', elList, totalAnimations);
  // Fire custom animations
  $(elList[0]).each((ind, el) => {
    console.log(el);
    //const animationName = $(el).attr('data-custom-animation');
    const targetElName = $(el).attr('data-custom-animation-target');
    const targetEl = $(`#${targetElName}`)[0];

    // Get position of el to copy

    // $(targetEl).addClass(animationName);

    // $(targetEl).one(
    //   'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
    //   function() {
    //     animationsFinished++;
    //     checkForAllFinished(el);
    //   }
    // );

    console.log(targetEl);

    //$(el).addClass($(el).attr(`data-animate-out`));

    // $(el).one(
    //   'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
    //   function() {
    //     animationsFinished++;
    //     checkForAllFinished(el);
    //   }
    // );
  });

  // function checkForAllFinished(el) {
  //   if (animationsFinished === totalAnimations) {
  //     const event = new CustomEvent(`animationEndout`, {
  //       bubbles: true,
  //       cancelable: true
  //     });

  //     el.dispatchEvent(event);
  //   }
  // }
}
