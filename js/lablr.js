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

    ns.init = function(el){
        if( !placeholderIsSupported() ) {
          
            var input = Array.prototype.slice.call(document.getElementsByTagName(el)),
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


lablr.init( 'input' );