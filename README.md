# wouldLike.js

For rapidly prototyping without downloading libraries getting in your way.

## How?

It takes what you give it and searches [cdnjs](http://cdnjs.com/) for it, before injecting it into the page.

## Show Me

This means you can do this:

```
wouldLike('jquery').then(function() {
  console.log('jQuery is loaded');
});

wouldLike('underscore.js');
wouldLike('backbone.js');
wouldLike('zepto.js');

wouldLike.whenLoaded(['underscore.js', 'backbone.js', 'zepto.js], function() {
  console.log("all of the above are loaded!");
});
```

Without _ever_ having to go and download jQuery / Underscore / Backbone / Zepto yourself.

## But that's like RequireJs / Bower / whatever!
Maybe - but this is designed to allow you to quickly try something out, or quickly grab jQuery to test a thing and reduce the friction of hacking. It's not meant to be AMD compliant, or be used on production, or for any complex app (yet ;D).

## Browser Support
Only currently tested in Chrome 28. Further tests to come.
