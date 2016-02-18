angular
    .module('app')
    .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];

function config($urlRouterProvider,$stateProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/admin', '/admin/dashboard');
    $urlRouterProvider.when('/admin/', '/admin/dashboard');

    $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
    })
    .state('admin', {
        url:'/admin',
        templateUrl: 'app/admin/admin.html',
    })
    .state('admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/admin/dashboard.html',
        controller: 'AdminDashboardController',
        controllerAs: 'vm'
    })
    .state('admin.location', {
        url: '/location',
        templateUrl: 'app/admin/location.html',
        controller: 'AdminLocationController',
        controllerAs: 'vm'
    })
    .state('admin.contribution', {
        url: '/contribution',
        templateUrl: 'app/admin/contribution.html',
        controller: 'AdminContributionController',
        controllerAs: 'vm'
    })
    .state('admin.user', {
        url: '/user',
        templateUrl: 'app/admin/user.html',
        controller: 'AdminUserController',
        controllerAs: 'vm'
    })

    $locationProvider.html5Mode({
        enabled: true
    });
}
