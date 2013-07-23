wouldLike('jquery');

wouldLike.whenLoaded(['jquery'], function() {
  console.log("jQuery loaded");
});

wouldLike('underscore.js').then(function() {
  console.log("underscore loaded");
});

wouldLike.whenLoaded(['jquery', 'underscore.js'], function() {
  console.log("both loaded");
});

wouldLike.relative('foo.js').then(function() {
  console.log("I loaded foo");
});

wouldLike.relative(['foo.js', 'bar.js']).then(function() {
  console.log("loaded foo and bar");
});
