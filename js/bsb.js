$(function() {
	var $fullpage = $("#fullpage");

	$fullpage.fullpage({
		afterLoad: function(anchorLink, index) {
			var tableDisplayPageNum = 2,
				getSecondsFromNow = function(thisMoment) {
					return Math.round(moment().diff(bdaytime)/millisecondMultiplier);
				}

			if (index === tableDisplayPageNum) {
				var bdaytime = moment($("input[name=bdaytime]").val()),
					secondMilestones = {
						'billion': 1e9,
						'million': 1e6,
						'thousand': 1e3
					},
					millisecondMultiplier = 1e3,
					$milestone,
					milestoneMoment,
					secondsFromNow,
					flipclockParameters;

				$('#current .flipclock')
					.empty()
					.FlipClock(getSecondsFromNow(bdaytime)), {
						clockFace: 'Counter',
						autoStart: true
					});


				for(milestone in secondMilestones) {
					var milestoneMoment = moment(bdaytime + secondMilestones[milestone] * millisecondMultiplier);
					console.log(milestoneMoment);
					$milestone = $("#" + milestone);
					milestoneMoment = moment(bdaytime + secondMilestones[milestone]*millisecondMultiplier);
					secondsFromNow = getSecondsFromNow(milestoneMoment);
					$milestone.find(".flipclock")
							.empty()
							.FlipClock(Math.abs(secondsFromNow), {
								clockFace: 'DailyCounter',
								countdown: (secondsFromNow >= 0)
							});
					// $milestone.find(".livestamp").livestamp(milestoneMoment);
					$milestone.find(".date").text(milestoneMoment.toLocaleString());
				}
			}
		}
	});

	$("#goButton").click(function() {
		$fullpage.fullpage.moveSectionDown();
	});
});
