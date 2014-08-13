$(function() {
    var $fullpage = $("#fullpage");

    $fullpage.fullpage({
        afterLoad: function(anchorLink, index) {
            var tableDisplayPageNum = 2,
                millisecondMultiplier = 1e3,
                secondMilestones = {
                    'billion': 1e9,
                    'million': 1e6,
                    'thousand': 1e3
                },
                bdaytime,
                $milestone,
                milestoneMoment,
                secondsFromNow,
                flipclockParameters,
                nextBirthday,
                getSecondsFromNow = function(thisMoment) {
                    return Math.round(thisMoment.diff(moment())/millisecondMultiplier);
                },
                populateMilestones = function(bdaytime, secondMilestones) {
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
                },
                populateNextMilestones = function(bdaytime, quantums) {
                    var currentSecondsAge,
                        ageAtnextMilestone,
                        nextMilestoneMoment,
                        $nextMilestone,
                        quantum;
                    for(quantum in quantums) {
                        $nextMilestone = $("#next" + capitaliseFirstLetter(quantum));
                        currentSecondsAge = Math.abs(getSecondsFromNow(bdaytime));
                        ageAtnextMilestone = Math.ceil(currentSecondsAge/quantums[quantum]) * quantums[quantum];
                        nextMilestoneMoment = moment(bdaytime + ageAtnextMilestone * millisecondMultiplier);

                        $nextMilestone.find(".flipclock")
                                .empty()
                                .FlipClock(ageAtnextMilestone - currentSecondsAge, {
                                    clockFace: 'DailyCounter',
                                    countdown: true
                                });
                        $nextMilestone.find(".livestamp").livestamp(nextMilestoneMoment);
                        $nextMilestone.find(".date").text(nextMilestoneMoment.toLocaleString());
                    };
                    
                },
                capitaliseFirstLetter = function(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
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

                nextBirthday = moment() < bdaytime.clone().set('year', moment().get('year')) ?
                    bdaytime.clone().set('year', moment().get('year')) :
                    bdaytime.clone().set('year', moment().get('year') + 1);
                $('#nextBirthday .flipclock')
                    .empty()
                    .FlipClock(Math.round((nextBirthday - bdaytime) / millisecondMultiplier), {
                        clockFace: 'Counter',
                    });

                populateMilestones(bdaytime, secondMilestones);
                populateNextMilestones(bdaytime, secondMilestones);

                
            }
        }
    });

    $("#goButton").click(function() {
        $fullpage.fullpage.moveSectionDown();
    });
});
