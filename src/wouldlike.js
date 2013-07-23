(function() {

  var wouldLike = function(thing) {
    loadThing(thing);
    return {
      then: function(fn) {
        wouldLike.whenLoaded(thing, fn);
      }
    };
  };

  wouldLike.ready = false;
  wouldLike.config = {};
  wouldLike.config.wouldLikeFile = "wouldLikefile.js";
  wouldLike.config.wouldLikeSource = undefined;

  wouldLike.repository = {};

  var loadCdnJs = function() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://rawgithub.com/cdnjs/website/gh-pages/packages.json", true);
    req.onload = function(data) {
      wouldLike.repository = JSON.parse(data.target.response);
      wouldLike.ready = true;
      wouldLike.repository.ready = true;
    };
    req.onerror = function() {
      console.log("wouldLike Error parsing CDNJS Packages", arguments);
    };
    req.send(null);
  };

  var searchCdnJs = function(term) {
    if(!wouldLike.ready) {
      setTimeout(function() {
        searchCdnJs(term);
      }, 10);
      return;
    }
    var baseUrl = "//cdnjs.cloudflare.com/ajax/libs/";

    var found = false;
    wouldLike.repository.packages.forEach(function(item) {
      if(item.name.toLowerCase() == term.toLowerCase()) {
        found = baseUrl + [item.name, item.assets[0].version, item.filename].join("/")
      }
    });
    return found;
  };

  var loadJsFile = function(file, callback) {
    var script = document.getElementsByTagName('script')[0],
    newjs = document.createElement('script');

    // IE
    newjs.onreadystatechange = function () {
      if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
        newjs.onreadystatechange = null;
        callback();
      }
    };
    // others
    newjs.onload = function () {
      callback();
    };
    newjs.src = file;
    script.parentNode.insertBefore(newjs, script);
  };
  loadCdnJs();

  wouldLike.whenLoaded = function(thing, fn) {
    if(wouldLike.loaded.indexOf(thing) > -1) {
      fn();
    } else {
      setTimeout(function() {
        wouldLike.whenLoaded(thing, fn);
      }, 10);
    }
  };
  wouldLike.loaded = [];

  var loadThing = function(thing) {
    if(!wouldLike.ready) {
      setTimeout(function() {
        loadThing.call(wouldLike, thing);
      }, 10);
      return;
    }
    if(wouldLike.loaded.indexOf(thing) > -1) return;
    var file = searchCdnJs(thing);
    loadJsFile(file, function() {
      console.log("wouldLike:", thing, "loaded");
      wouldLike.loaded.push(thing);
    });
  }

  window.wouldLike = wouldLike;

})();
