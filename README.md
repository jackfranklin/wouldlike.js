# wouldLike.js

__A dead simple dependency manager for the browser.__

For rapidly prototyping without downloading libraries getting in your way. Inspired by the ease of use supplied by Ruby's `require` and `require_relative`.

## How?

It takes what you give it and searches [cdnjs](http://cdnjs.com/) for it, before injecting it into the page.

## Show Me

This means you can do this:

```js
wouldLike('jquery').then(function() {
  console.log('jQuery is loaded');
});

wouldLike('underscore.js');
wouldLike('backbone.js');
wouldLike('zepto.js');

wouldLike.whenLoaded(['underscore.js', 'backbone.js', 'zepto.js'], function() {
  console.log("all of the above are loaded!");
});

wouldLike.relative('foo.js').then(function() {
  console.log("I loaded foo");
});
// for relative, either use the above or pass true as second arg to wouldLike
wouldLike('foo.js', true).then(function() {
  console.log("I loaded foo");
});

// you can pass in an array too
wouldLike.relative(['foo.js', 'bar.js']).then(function() {
  console.log("loaded foo and bar");
});
```

Without _ever_ having to go and download jQuery / Underscore / Backbone / Zepto yourself.

wouldLike also knows what it's downloaded or is in the progress of downloading, so it wont download things more than once.

## But that's like RequireJs / Bower / whatever!
Maybe - but this is designed to allow you to quickly try something out, or quickly grab jQuery to test a thing and reduce the friction of hacking. It's not meant to be AMD compliant, or be used on production, or for any complex app (yet ;D).

## Browser Support
Only currently tested in Chrome 28. Further tests to come.
