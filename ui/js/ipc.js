define('ipc', [
], function (data) {
	return {
		on: function (name, fn) {
			require(['json!../../data.json'], function(data) {
				fn(data);
			});
		}
	};
});