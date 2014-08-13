$(function() {
    var $fullpage = $("#fullpage");

    $fullpage.fullpage({
        afterLoad: function(anchorLink, index) {
            var tableDisplayPageNum = 2,
                secondMilestones = {
                    'billion': 1e9,
                    'million': 1e6,
                    'thousand': 1e3
                },
                millisecondMultiplier = 1e3,
                bdaytime,
                $milestone,
                milestoneMoment,
                secondsFromNow,
                flipclockParameters,
                getSecondsFromNow = function(thisMoment) {
                    return Math.round(thisMoment.diff(moment())/millisecondMultiplier);
                },
                populateMilestones = function(bdaytime) {
                    for(milestone in secondMilestones) {
                        milestoneMoment = moment(bdaytime + secondMilestones[milestone] * millisecondMultiplier);
                        $milestone = $("#" + milestone);
                        secondsFromNow = getSecondsFromNow(milestoneMoment);
                        $milestone.find(".flipclock")
                                .empty()
                                .FlipClock(Math.abs(secondsFromNow), {
                                    clockFace: 'DailyCounter',
                                    countdown: (secondsFromNow > 0)
                                });
                        $milestone.find(".livestamp").livestamp(milestoneMoment);
                        $milestone.find(".date").text(milestoneMoment.toLocaleString());
                    }
                };

            if (index === tableDisplayPageNum) {
                bdaytime = moment($("input[name=bdaytime]").val());

                $('#current .flipclock')
                    .empty()
                    .FlipClock(Math.abs(getSecondsFromNow(bdaytime)), {
                        clockFace: 'Counter',
                        countdown: (secondsFromNow <= 0),
                        autoStart: true
                    });

                populateMilestones(bdaytime);                
                
            }
        }
    });

    $("#goButton").click(function() {
        $fullpage.fullpage.moveSectionDown();
    });
});
