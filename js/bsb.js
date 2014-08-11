$(function() {
	var $fullpage = $("#fullpage");

	$fullpage.fullpage({
		afterLoad: function(anchorLink, index) {
			var tableDisplayPageNum = 2;

			if (index === tableDisplayPageNum) {
				var bdaytime = moment($("input[name=bdaytime]").val()),
					secondMilestones = {
						'billion': 1e9,
						'million': 1e6,
						'thousand': 1e3
					},
					millisecondMultiplier = 1e3,
					$milestone,
					milestoneMoment;

				$('#current .flipclock')
					.empty()
					.FlipClock(Math.round(moment().diff(bdaytime)/millisecondMultiplier), {
						clockFace: 'Counter',
						autoStart: true
					});

				for(milestone in secondMilestones) {
					var milestoneMoment = moment(bdaytime + secondMilestones[milestone] * millisecondMultiplier);
					console.log(milestoneMoment);
					$milestone = $("#" + milestone);
					$milestone.find(".livestamp").livestamp(milestoneMoment);
					$milestone.find(".date").text(milestoneMoment.toLocaleString());
				}
			}
		}
	});

	$("#goButton").click(function() {
		$fullpage.fullpage.moveSectionDown();
	});
});
