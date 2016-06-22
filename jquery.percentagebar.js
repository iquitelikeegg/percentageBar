(function($) {
    $.fn.percentageBar = function(options) {
        var self = this;

        var settings = jQuery.extend({
            // These are the defaults.
            delay: 500,
            time: 5000,
            gradientFrom: '#ff4784',
            gradientTo: '#6296C8',
            emptyFill: 'transparent'
        }, options );

        var classes = {
            bar : "percentage-bar--bar",
            barInner : "percentage-bar--bar--inner",
            barInnerEmpty : "percentage-bar--bar--inner--empty",
            value : "percentage-bar--value",
        };

        var barInnerStyles = "height: 100%; position: absolute; top: 0; left: 0; border-radius: inherit;"

        // Create the percentage bar elements
        var bar = this.children("." + classes.bar)
            .css({
                overflow: "hidden",
                position: "relative"
            })
            .append(
                $('<div />', {
                    class: classes.barInnerEmpty,
                    style: barInnerStyles + "width: 100%; background-color: "
                        + options.emptyFill + ";"
                }),
                $('<div />', {
                    class: classes.barInner,
                    style: barInnerStyles + "width: 0%; background: linear-gradient(to left,"
                        + options.gradientFrom + ", " + options.gradientTo + ");"
                        + "transition: all " + options.time + "ms;"
                })
            );

        var animatePercentageBar = function() {
            var value = $(this).find("." + classes.value)[0]
                .getAttribute('data-percentageBar-value');

            var self = this;

            setTimeout(function() {
                $(self).find("." + classes.barInner).css({
                    width: value + "%"
                });
            }, options.delay);
        }

        return this.each(function() {
            $(self).waypoint(animatePercentageBar,{
                offset: "100%",
                triggerOnce: !0
            })
        });
    }
})(jQuery);