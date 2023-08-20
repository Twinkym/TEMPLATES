function signature() {
    window.signature = {
        initialize: function () {
            $('.signature svg').each(function () {
                let delay = 0; // Initialize delay
                const paths = $('path, circle, rect', this);
                paths.each(function () { // Loop through each path element
                    const path = $(this);
                    const length = path.get(0).getTotalLength(); // Calculate path length
                    const previousStrokeLength = path.attr('data-speed') || 0; // Get previous speed

                    let speed = length < 100 ? 20 : Math.floor(length);
                    delay += parseInt(previousStrokeLength) + 100;

                    path.css('transition', 'none')
                        .attr('data-length', length)
                        .attr('data-speed', speed)
                        .attr('data-delay', delay)
                        .attr('stroke-dashoffset', length)
                        .attr('stroke-dasharray', length + ',' + length);
                });
            });
        },
        animate: function () {
            $('.signature svg').each(function () {
                const paths = $('path, circle, rect', this);
                paths.each(function () { // Loop through each path element
                    const path = $(this);
                    const length = path.attr('data-length');
                    const speed = path.attr('data-speed');
                    const delay = path.attr('data-delay');

                    path.css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear')
                        .attr('stroke-dashoffset', '0');
                });
            });
        }
    };

    $(document).ready(function () {
        window.signature.initialize();
    });

    $('button').on('click', function () {
        window.signature.initialize();
    });

    setTimeout(function () {
        window.signature.animate();
    }, 500);

    $(window).on('load', function () {
        window.signature.animate();
    });
}