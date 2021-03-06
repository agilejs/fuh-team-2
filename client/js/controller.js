function AppCtrl ($scope) {
    'use strict';
    $scope.title = 'The Movie Database';
}

function WelcomeCtrl ($scope, moviesResponse) {
    'use strict';
    $scope.movies = moviesResponse.data;
    $scope.nav = 'home';
}

function MoviesListCtrl ($scope, $location, moviesResponse) {
    'use strict';
    $scope.nav = 'movies';
    $scope.movies = moviesResponse.data;
    $scope.add = function () {
        $location.path('/movies/new');
    };
}

MoviesListCtrl.resolve = {
    moviesResponse: function ($http) {
        'use strict';
        return $http.get('/movies');
    }
};

function MoviesAddCtrl ($scope, $http, $location) {
    'use strict';
    $scope.movie = {};
    $scope.save = function (movie) {
        $http.post('/movies', movie)
        .success(function(res) {
            $location.path('/movies/' + res.id);
        });
    };
}

function MovieDetailCtrl ($scope, $http, $location, moviesResponse) {
    'use strict';
    $scope.movie = moviesResponse.data;

    $scope['delete'] = function () {
        $http['delete']('/movies/' + $scope.movie.id).success(function (res) {
            $location.path('/movies');
        });
    };
}

function movieDetailResolver ($http, $route) {
    'use strict';
    var id = $route.current.params.id;
    return $http.get('/movies/' + id);
}

MovieDetailCtrl.resolve = {
    moviesResponse: movieDetailResolver
};

function MovieEditCtrl ($scope, $http, $location, moviesResponse) {
    'use strict';
    $scope.movie = moviesResponse.data;

    $scope.save = function () {
        $http.put('/movies/' + $scope.movie.id, $scope.movie)
        .success(function (res) {
            $location.path('/movies/' + $scope.movie.id);
        });
    };
}

MovieEditCtrl.resolve = {
    moviesResponse: movieDetailResolver
};

function NotFoundCtrl ($scope, $location) {
    'use strict';
    $scope.culprit = $location.search().culprit || 'unknown beast';
}

var ErrorCtrl = NotFoundCtrl;

function HeaderController($scope, $route) {
    'use strict';
    $scope.active = function(name) {
        return ($route.current && ($route.current.activeTab === name)) ? 'active' : '';
    };
}

function MovieTabController($scope) {
    'use strict';
    $scope.printYear = function(year) {
        return (year == null || year === undefined) ? 'unknown' : year;
    };
}

function ActorsAddCtrl ($scope, $http, $location) {
    'use strict';
    $scope.actor = {};
    $scope.save = function (actor) {
        $http.post('/actor', actor)
        .success(function(res) {
            $location.path('/actors/' + res.id);
        });
    };
}
