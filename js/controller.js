var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService, $interval) {

	$scope.getPosts = function() {
		FirebaseService.getData().then(function(posts) {
			$scope.posts = posts;
		});
	};

	$scope.getPosts();

	$scope.addPost = function() {
		FirebaseService.addPost($scope.newPost).then(function() {
			$scope.getPosts();
			$scope.newPost = {};
		});
	};

	$scope.vote = function(id, direction) {
		FirebaseService.vote(id, $scope.posts[id].karma, direction).then(function() {
			$scope.getPosts();
		});
	};

	$scope.submitComment = function(id, comment, currentComments) {
		FirebaseService.addComment(id, comment, (currentComments || [])).then(function() {
			$scope.getPosts();
		});
	};

	$interval($scope.getPosts(), 5000);

});