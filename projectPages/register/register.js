app.controller('SignupController', function ($scope, $modal, $http, $location, $rootScope, $modalInstance, $state) {
    $scope.ok = function (email, password,type) {
        console.log($scope.type);
        var checkifexists = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + email + "'}|";
        $http.get(checkifexists).success(function (response) {
            
            if (response.length >= 1) {
                $rootScope.signupMessage = "seems like you have already registered";
            }
            else {
               
                var URL = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB";
                
                $http.post(URL, { "user_id": email, "password": password, "preferences": [],"type":$scope.type}).success(function (data, status, headers, config) {
                   
                    $rootScope.currentUser = data;
                    $rootScope.signupMessage = "You have successfully registered";
                    $modalInstance.close();
                    $location.url("/profile/" + email);
                }).error(function () {
                    console.log("error");
                });
            }
        });
    }
});