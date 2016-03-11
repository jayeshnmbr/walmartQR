// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var moduleQR = angular.module('starter', ['ionic','ngCordova']);

moduleQR.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

moduleQR.factory('qrService', function() {


})

moduleQR.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('data',{
    url:'/data',
    templateUrl: 'data.html',
    controller: 'qrController'
  })
  .state('home',{
    url:'/home',
    templateUrl: 'home.html',
    controller: 'homeController'
  });

  $urlRouterProvider.otherwise('/home');
})

moduleQR.controller('qrController', ['$rootScope',
   function($rootScope,$state) {
     $rootScope.$on('eventName', function (event, args) {

       $rootScope.qrData = args.message;
       $state.go('/home');

     })
   }])

moduleQR.controller('homeController', ['$rootScope','$cordovaBarcodeScanner','$ionicPlatform', '$state',
  function($rootScope,$cordovaBarcodeScanner,$ionicPlatform,$state) {
    //$rootScope.qrData = "hi hellooghfg";
   // $rootScope.$broadcast('eventName', { message: $rootScope.qrData });
    $rootScope.scan = function(){
      $ionicPlatform.ready(function() {
        $cordovaBarcodeScanner.scan().then(function(barcodeData) {
          //alert(JSON.stringify(barcodeData.text));
          $rootScope.qrData= barcodeData.text;
          $rootScope.$broadcast('eventName', { message: $rootScope.qrData });
          $state.go('/data');
        }, function(error) {
          alert(JSON.stringify(error));
        });
      });
    }
  }
]);
