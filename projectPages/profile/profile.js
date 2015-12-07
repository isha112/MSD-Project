
app.factory("ProfileServices", function ($http, $rootScope,$timeout) {
    var updateCurrentUser = function (password, firstName, lastName, username, photo, selPref) {
        var currentUser = {
            user_id: username,
            password: password,
            last_name: lastName,
            first_name: firstName,
            profile_pic: photo,
            preferences: selPref
        }
        //alert(currentUser);
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}";
        $http.put(url, currentUser).success(function(response){
            console.log('inside update');
            //$timeout(function () {
            //    $rootScope.$broadcast('clearData');
            //}, 100);
            //$timeout(function () {
            //    $rootScope.$broadcast('rEvent');
            //}, 500);
            
        });
        

    }
    var updatePhoto = function (photo) {
        $rootScope.currentUser.profile_pic = photo;
    }
    return {

        updateCurrentUser: updateCurrentUser,
        updatePhoto: updatePhoto

    }

});

app.controller("ProfileController", function ($scope, $routeParams, $http, $rootScope, ProfileServices) {

    $(function () {
        //console.log('currentUser');
        //console.log($rootScope.currentUser);
        var username = $rootScope.currentUser.user_id;
        var url = "https://api.mongolab.com/api/1/databases/whatsup/collections/user?apiKey=X4DP_x-ddA0EnHU01IKdebLXDOORWWiB&q={'user_id':'" + username + "'}"
        $http.get(url)
        .success(function (res) {

            $rootScope.currentUser = res[0];
            var userinfo = $rootScope.currentUser;
            console.log('current user');
            console.log(userinfo);
            $scope.new_fn = userinfo.first_name;
            $scope.new_ln = userinfo.last_name;
            $scope.new_pwd = userinfo.password;
            $scope.re_pwd = userinfo.password;
            $scope.selectedPref = userinfo.preferences;
            if (userinfo.photo == null)
                $scope.loc = "../images/dp.jpg";
            else
                $scope.loc = userinfo.photo;

        });
    })

    $scope.mismatch = false;
    $scope.save = false;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        console.log("inside handle file select evt");
        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                var photo = $scope.loc;
                ProfileServices.updatePhoto($scope.loc);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("File picked");
        document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }
    $scope.prefArr = [
       
         'music',
         'learning_education',
         'festivals_parades',
         'food',
         'performing_arts',
         'schools_alumni',
         'sports'
    ];
    //$scope.selectedPref = [];
    
    $scope.saveChanges = function () {
        //console.log('Pref');
        //console.log($scope.selectedPref);

        var username = $rootScope.currentUser.user_id;
        var password = $scope.new_pwd;
        var repassword = $scope.re_pwd;
        var firstName = $scope.new_fn;
        var lastName = $scope.new_ln;
        var photo = $scope.loc;
        var selPref = $scope.selectedPref;
        //console.log('pref arr');
        //console.log(selPref);
         
        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            ProfileServices.updateCurrentUser(password, firstName, lastName, username, photo, selPref);
        }
    }
});