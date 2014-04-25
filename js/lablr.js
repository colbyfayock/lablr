(function(ns){

    // Lablr
    // Checks if placeholder is supported, if not it adds a label matching the placeholder before each input.

    var placeholderIsSupported, _slice;

    // Check for placeholder support
    // Via http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported

    placeholderIsSupported = function() {
        var test = document.createElement('input');
        return ('placeholder' in test);
    }

    // Check for full Array.prototype.slice support
    // Via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

    _slice = Array.prototype.slice;

    try {
        _slice.call(document.documentElement); 
    }
    catch (e) {
        Array.prototype.slice = function (begin, end) {
            var i, arrl = this.length, a = [];
            if (this.charAt) { 
                for (i = 0; i < arrl; i++) {
                    a.push(this.charAt(i));
                }
            }
            else { 
                for (i = 0; i < this.length; i++) { 
                    a.push(this[i]);
                }
            }
            return _slice.call(a, begin, end || a.length);
        };
    }

    try {
        document.querySelectorAll('body');
    } catch( e ) {
        document.querySelectorAll = function(classname) {
            var a = [],
                re = new RegExp('(^| )'+classname+'( |$)'),
                els = document.body.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className)) a.push(els[i]);
            return a;
        }
    }



    ns.init = function(userSettings){

        settings = {
            selector: userSettings.selector && userSettings.selector != '' ? userSettings.selector : 'input',
            test: userSettings.test && userSettings.test != '' ? userSettings.test : false
        };

        if( settings.test || !placeholderIsSupported() ) {
          
            var input = Array.prototype.slice.call(document.querySelectorAll(settings.selector)),
                inputLen = input.length,
                createLabel;

            createLabel = function(input) {
                var p = input.getAttribute('placeholder'),
                    l = document.createElement('label');
                l.innerHTML = p;
                return l;
            }

            while(input.length) {
                var i = input.pop(),
                    parent = i.parentNode;
                parent.insertBefore( createLabel(i), parent.childNodes[0] || null );
            }
          
        }
    };

}(this.lablr = this.lablr || {}));