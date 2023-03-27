(function ($) {
  // "use strict";
  $(function () {
    $('[data-toggle="offcanvas"]').on("click", function () {
      alert("csd");
      $(".sidebar-offcanvas").toggleClass("active");
    });
  });
})(jQuery);
