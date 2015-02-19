var app = angular.module('reddit');

app.service('FirebaseService', function($http, $q) {

	this.getData = function() {
		$http({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json'
		});
	};

});