(function (window) {
  loadCSS("../static/css/pageloading.css");
  function loadCSS(url) {
    var doc = window.document;
    var docEl = doc.documentElement;
    var el = doc.createElement("link");
    el.rel = "stylesheet";
    el.href = url;
    el.async = false;
    docEl.appendChild(el);
  }

  var loadingWrapper = document.createElement("div");
  loadingWrapper.className = "loader";
  loadingWrapper.setAttribute("id", "page_loading");
  var loadingStr = '<div class="loader-inner">' +

    '</div>';


  loadingWrapper.innerHTML = loadingStr;
  document.body.appendChild(loadingWrapper)

  window.h5PageLoadingHide = function () {
    clearTimeout(hideLoadingTimer);
    loadingWrapper.style.opacity = 0;
    loadingWrapper.style.webkitTransition = "opacity 0.3s";
    loadingWrapper.style.transition = "opacity 0.1s";
    setTimeout(function () {
      loadingWrapper.style.display = "none";
    }, 100)
  }


  var hideLoadingTimer = setTimeout(function () {
    if (window.h5PageLoadingHide) {
      window.h5PageLoadingHide();
    }
  }, 5000)

})(window);