(function() {
  var attached = false;
  function attachReviewsHandler() {
    if (attached) return;
    var allElements = document.querySelectorAll('button, a');
    for (var i = 0; i < allElements.length; i++) {
      var el = allElements[i];
      if (el.textContent.trim() === 'Відгуки' && !el._reviewsHandled) {
        el._reviewsHandled = true;
        el.addEventListener('click', function(e) {
          if (e.defaultPrevented) return;
          if (el.tagName === 'A' && el.getAttribute('href') === '#reviews') return;
          e.preventDefault();
          var reviews = document.getElementById('reviews');
          if (reviews) {
            reviews.scrollIntoView({behavior: 'smooth'});
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', '#reviews');
            }
          } else {
            window.location.href = '/#reviews';
          }
        }, true);
      }
    }
    var found = false;
    var els = document.querySelectorAll('button, a');
    for (var j = 0; j < els.length; j++) {
      if (els[j].textContent.trim() === 'Відгуки') { found = true; break; }
    }
    if (found) attached = true;
  }
  var poll = setInterval(attachReviewsHandler, 200);
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(attachReviewsHandler, 500);
    setTimeout(attachReviewsHandler, 1500);
  });
  if (window.location.hash === '#reviews') {
    var hashPoll = setInterval(function() {
      var reviews = document.getElementById('reviews');
      if (reviews && reviews.offsetHeight > 0) {
        reviews.scrollIntoView({behavior: 'smooth'});
        clearInterval(hashPoll);
      }
    }, 200);
    setTimeout(function() { clearInterval(hashPoll); }, 5000);
  }
})();
