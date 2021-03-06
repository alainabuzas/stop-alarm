angular.module('BusServices', [])

.factory('BusStop', ['$http', function($http) {
        return {
            showStop: function(id) {
                return $http.get('/api/stops/' + id);
            },
            showAllStops: function() {
                var req = {
                    url: '/api/stops',
                    method: 'GET'
                };
                return $http(req);
            },
            // calcDistance: function(origin, destination) {

            //     var key = 'AIzaSyBGLbnbaRS5OktKaAZBOSWKho_D6GSfg4I';
            //     var url = `https://maps.googleapis.com/maps/api/distancematrix/json?key=` + key + `&origins=${origin}&destinations=${destination},-122.290512&units=imperial`;
            //     var req = {
            //         url: url,
            //         method: 'GET'
            //     };
            //     return $http(req);

            // }
        };
    }])
    .factory('Auth', ['$window', function($window) {
        return {
            saveToken: function(token) {
                $window.localStorage['secretrecipes-token'] = token;
            },
            getToken: function() {
                return $window.localStorage['secretrecipes-token'];
            },
            removeToken: function() {
                $window.localStorage.removeItem('secretrecipes-token');
            },
            isLoggedIn: function() {
                var token = this.getToken();
                return token ? true : false;
            },
            currentUser: function() {
                if (this.isLoggedIn()) {
                    var token = this.getToken();
                    try {
                        var payload = JSON.parse($window.atob(token.split('.')[1]));
                        return payload;
                    } catch (err) {
                        return false;
                    }
                }
            }
        };
    }])
    .factory('AuthInterceptor', ['Auth', function(Auth) {
        return {
            request: function(config) {
                var token = Auth.getToken();
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        };
    }]);
