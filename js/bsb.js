$(function() {
	$('#fullpage').fullpage({
		afterLoad: function(anchorLink, index) {
			var tableDisplayPageNum = 2;
			if (index === tableDisplayPageNum) {
				var birthday = moment($("input.birthday").val()),
					secondMilestones = {
						'billion': 1e9,
						'million': 1e6,
						'thousand': 1e3
					},
					millisecondMultiplier = 1e3,
					$milestone,
					milestoneMoment;


				for(milestone in secondMilestones) {
					$milestone = $("#" + milestone);
					milestoneMoment = moment(birthday + secondMilestones[milestone]*millisecondMultiplier);
					$milestone.find(".livestamp").livestamp(milestoneMoment);
					$milestone.find(".date").text(milestoneMoment.toLocaleString())
				}
			}
		}
	});

	$("#goButton").click(function() {
		$("#fullpage").fullpage.moveSectionDown();
	});
});
