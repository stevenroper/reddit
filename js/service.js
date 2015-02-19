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


	this.addPost = function(post) {
		post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();

		return $http({
			method: 'PUT',
			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
			data: post
		});
	};


	function guid() {
		var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
	}


	this.vote = function(postId, currentKarma, direction) {
		var deferred = $q.defer();

		if(direction === 'up') {
			currentKarma++;
		} else if(direction === 'down') {
			currentKarma--;
		}

		$http({
			method: 'PATCH',
			url: 'https://devmtn.firebaseio.com/posts/' + postId + '.json',
			data: {karma: currentKarma}
		}).then(function(data) {
			deferred.resolve(data);
		}, function(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};


	this.addComment = function(postId, newComment, commentsArray) {
		commentsArray.push(newComment);

		var deferred = $q.defer();

		$http({
			method: 'PATCH',
			url: 'https://devmtn.firebaseio.com/posts/' + postId + '.json',
			data: {comments: commentsArray}
		}).then(function(data) {
			deferred.resolve(data);
		}, function(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};


});













