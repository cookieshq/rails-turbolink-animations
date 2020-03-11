export default function setupTransition() {

  let _isAnimating = false;

  $(document).on('turbolinks:load', e => {
    console.log('TURBOLINKS LOAD');
    // Default load animation
    _isAnimating = true;
    $('main').fadeIn(3000, fadeInComplete);

    function fadeInComplete() {
      _isAnimating = false;
    }
  });


  $(document).on('turbolinks:before-visit', e => {
    if (!_isAnimating) {
      event.preventDefault();
      event.stopImmediatePropagation();
      _isAnimating = true;
      const targetEl = e.target.activeElement;
      const targetUrl = event.data.url;
      console.log(e, targetEl);

      $('body, html').animate({scrollTop: 0}, 500);

      if ($(targetEl).hasClass('article-btn-link')) {
        // Find closest img
        const img = $(targetEl).siblings('.card-img')[0];
        // Get height and position
        const imgSpecs = {
          width: $(img).width(),
          height: $(img).height(),
          top: $(img).offset().top,
          left: $(img).offset().left,
        }
        // Clone node, add current position & append
        const newImgNode = $(img).clone();
        addCssToEl(newImgNode, imgSpecs);
        newImgNode.appendTo('body');

        console.log(newImgNode[0]);
        // Add transition class
        setTimeout(() => {
          newImgNode.addClass('transition-to-fs');
        }, 0);
 
        const targetUrl = event.data.url;
        

        $('main').fadeOut(3000, function() {
          directToNewUrl(targetUrl);
        });


      } else {
        $('main').fadeOut(3000, function() {
          directToNewUrl(targetUrl);
        });

      }
    }

    function directToNewUrl(url) {
      Turbolinks.visit(url);
    }
  });





  $(document).on('turbolinks:before-cache', e => {
    $('main').css({'opacity': '1'});
  });

}



function addCssToEl(node, imgSpecs) {
  node.css({'width': imgSpecs.width, 'height': imgSpecs.height, 'position': 'absolute', 'top': imgSpecs.top, 'left': imgSpecs.left });
}

