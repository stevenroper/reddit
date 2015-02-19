var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService) {

	$scope.getPosts = function() {
		FirebaseService.getData().then(function(posts) {
			$scope.posts = posts;
		});
	};

	$scope.getPosts();
});