(function($) {

    // jQuery lablr
    // Checks if placeholder is supported, if not it adds a label matching the placeholder before each input.

    // Check for placeholder support
    // Via http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported

    var placeholderIsSupported = function() {
        return ( 'placeholder' in document.createElement('input') );
    }

    $.fn.lablr = function(userSettings){

        settings = {
            test: false
        };

        $.extend(true, settings, userSettings);
        

        if( settings.test || !placeholderIsSupported() ) {
          
            var input = $(this).is('form') ? $(this).find('input') : $(this),
                inputLen = input.length,
                currInput;

            for( var i = 0; i < inputLen; i++ ) {
                currInput = $(input[i]);
                currInput.before( '<label>' + currInput.attr('placeholder') + '</label>' );
            }
          
        }

        return this;
    };
 
}( jQuery ));