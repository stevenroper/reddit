var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService) {

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

	$scope.vote = function(id, currentKarma, direction) {
		FirebaseService.vote(id, currentKarma, direction).then(function() {
			$scope.getPosts();
		});
	};

	$scope.submitComment = function(id, comment, currentComments) {
		FirebaseService.addComment(id, comment, (currentComments || [])).then(function() {
			$scope.getPosts();
		});
	};


});