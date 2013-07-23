(function() {

  var wouldLike = function(thing, relative) {
    if(!(thing instanceof Array)) {
      thing = [thing];
    }
    relative = !!relative;
    thing.forEach(function(item) {
      console.log(wouldLike.loaded, wouldLike.loaded.indexOf(item));
      if(wouldLike.loaded.indexOf(item) == -1 && wouldLike.inProgress.indexOf(item) == -1) {
        wouldLike.inProgress.push(item);
        relative ? wouldLike._loadInternal(item): wouldLike._loadExternal(item);
      }
    });
    return {
      then: function(fn) {
        wouldLike.whenLoaded(thing, fn);
      }
    };
  };

  wouldLike.relative = function(thing) {
    return wouldLike(thing, true);
  }

  wouldLike.whenLoaded = function(things, fn, tries) {
    var tries = tries || 0;
    var thingsHas = [];
    things.forEach(function(thing) {
      if(wouldLike.loaded.indexOf(thing) > -1) {
        thingsHas.push(thing);
      }
    });
    if(thingsHas.length == things.length) {
      fn();
    } else {
      if(tries == 50) {
        console.log("wouldLike Timeout: Tried but couldn't resolve", things);
        return;
      } else {
        setTimeout(function() {
          wouldLike.whenLoaded(things, fn, ++tries);
        }, 50);
      }
    }
  };

  wouldLike.ready = false;
  wouldLike.config = {};
  wouldLike.repository = {};
  wouldLike.loaded = [];
  wouldLike.inProgress = [];
  wouldLike._whenDoneCb = function(thing) {
    console.log("wouldLike:", thing, "loaded");
    wouldLike.loaded.push(thing);
    var newInProgress = [];
    wouldLike.inProgress.forEach(function(item) {
      if(item !== thing) {
        newInProgress.push(item);
      }
    });
    wouldLike.inProgress = newInProgress;
  };


  wouldLike._loadExternal = function(searchTerm) {
    if(wouldLike.loaded.indexOf(searchTerm) > -1) return;
    if(!wouldLike.ready) {
      setTimeout(function() {
        wouldLike._loadExternal.call(wouldLike, searchTerm);
      }, 10);
      return;
    }
    var fullFilePath = wouldLike._searchCdnJs(searchTerm);
    wouldLike._loadJsFile(fullFilePath, searchTerm, wouldLike._whenDoneCb);
  };

  wouldLike._loadInternal = function(file) {
    // file path is the name for internal
    wouldLike._loadJsFile(file, file, wouldLike._whenDoneCb);
  };

  wouldLike._loadCdnJs = function() {
    //TODO: make this IE compliant
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

  wouldLike._searchCdnJs = function(term) {
    if(!wouldLike.ready) {
      setTimeout(function() {
        wouldLike._searchCdnJs(term);
      }, 10);
      return;
    }
    var baseUrl = "//cdnjs.cloudflare.com/ajax/libs/";

    var found = false;
    //TODO: change this to a regular for() loop so we can break once thing is found
    wouldLike.repository.packages.forEach(function(item) {
      if(item.name.toLowerCase() == term.toLowerCase()) {
        found = baseUrl + [item.name, item.assets[0].version, item.filename].join("/")
      }
    });
    //TODO: handle nothing being found
    return found;
  };

  wouldLike._loadJsFile = function(file, name) {
    var script = document.getElementsByTagName('script')[0],
    newjs = document.createElement('script');

    // IE
    newjs.onreadystatechange = function () {
      if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
        newjs.onreadystatechange = null;
        wouldLike._whenDoneCb(name);
      }
    };
    // others
    newjs.onload = function () {
      wouldLike._whenDoneCb(name);
    };
    newjs.src = file;
    script.parentNode.insertBefore(newjs, script);
  };



  // kick it off
  window.wouldLike = wouldLike;
  wouldLike._loadCdnJs();

})();
