define('ipc', [
], function (data) {
	return {
		on: function (name, fn) {
			require(['json!/node-cal-app/data.json'], function(data) {
				fn(data);
			});
		}
	};
});