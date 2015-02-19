var app = angular.module('reddit');

app.service('FirebaseService', function($http, $q) {

	this.getData = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json'
		}).then(function onSuccess(data) {
			deferred.resolve(data.data);
		}, function onFailure(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};

});