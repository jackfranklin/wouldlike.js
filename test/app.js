wouldLike('jquery');

wouldLike.whenLoaded('jquery', function() {
  console.log("jQuery loaded");
});

wouldLike('underscore.js').then(function() {
  console.log("underscore loaded");
});
