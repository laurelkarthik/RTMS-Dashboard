'use strict';
angular.module('app') 
    .config(
        [
            '$stateProvider', '$urlRouterProvider','CustomDateProvider',
            function($stateProvider, $urlRouterProvider,CustomDateProvider) {

                $urlRouterProvider
                    .otherwise('app/day/overall/0///////');
                $stateProvider
                
                   .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html',
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/layout.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                   .state('app.today', {
                        abstract: true,
                        url: '/day',
                        params:{
                          datebtn:"today",
                          from:function(){
                                var d = new Date(),
                                    month = '' + (d.getMonth() + 1),
                                    day = '' + d.getDate(),
                                    year = d.getFullYear();
                                if (month.length < 2) month = '0' + month;
                                if (day.length < 2) day = '0' + day;
                                return [year, month, day].join('-');
                            },
                          to:function(){
                                var d = new Date(),
                                    month = '' + (d.getMonth() + 1),
                                    day = '' + d.getDate(),
                                    year = d.getFullYear();
                                if (month.length < 2) month = '0' + month;
                                if (day.length < 2) day = '0' + day;
                                return [year, month, day].join('-');
                            }
                        },                        
                        templateUrl:''
                    })
                   .state('app.range', {
                        abstract: true,                      
                        url: '/range',                        
                        templateUrl:''
                    })                                                            
                      .state('app.today.overall',{
                        url: '/overall/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_td_overall.html'
                            }
                            // else if($stateParams.ward!=""){
                            //     return'views/ward_td_overall.html'
                            // }
                            // else if($stateParams.wp!=""){
                            //     return'views/wp_td_overall.html'
                            // } 
                            // else if($stateParams.ulb!=""||$stateParams.contractor!=""){
                            //     return'views/ulb_td_overall.html'
                            // } 
                            else{
                                return'views/td_overall.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'overall'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_overall.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })                  
                      .state('app.today.weighment',{
                        url: '/weighment/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_td_weighment.html'
                            } 
                            else{
                                return'views/td_weighment.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'weighment'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_weighment.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })
                      .state('app.today.transportation',{
                        url: '/transportation/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: 'views/td_transportation.html',
                        ncyBreadcrumb: {
                            label: 'transportation'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_transportation.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })   
                      .state('app.today.coverage',{
                        url: '/coverage/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: 'views/td_coverage.html',
                        ncyBreadcrumb: {
                            label: 'coverage'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_coverage.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })    
                      .state('app.today.absenteeism',{
                        url: '/absenteeism/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl:function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_absenteeism_td.html'
                            } 
                            else{
                                return'views/td_absenteeism.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'absenteeism'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_absenteeism.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                      .state('app.today.payments',{
                        url: '/payments/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: 'views/td_payments.html',
                        ncyBreadcrumb: {
                            label: 'payments'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_payments.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                      .state('app.today.grievance',{
                        url: '/grievance/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: 'views/td_grievance.html',
                        ncyBreadcrumb: {
                            label: 'grievance'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_grievance.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                      .state('app.today.cleanliness',{
                        url: '/cleanliness/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: 'views/td_cleanliness.html',
                        ncyBreadcrumb: {
                            label: 'cleanliness'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_cleanliness.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })                                                                                                                    
                    .state('app.range.overall', {
                        url: '/overall/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_range_overall.html'
                            }
                            // else if($stateParams.ward!=""){
                            //     return'views/ward_td_overall.html'
                            // }
                            // else if($stateParams.wp!=""){
                            //     return'views/wp_td_overall.html'
                            // } 
                            // else if($stateParams.ulb!=""||$stateParams.contractor!=""){
                            //     return'views/ulb_td_overall.html'
                            // } 
                            else{
                                return'views/td_overall.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'overall'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_overall.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })                                        
                    .state('app.range.weighment', {
                        url: '/weighment/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_range_weighment.html'
                            } 
                            else{
                                return'views/weighment.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'weighment'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/weighment.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                    .state('app.range.transportation', {
                        url: '/transportation/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: 'views/transportation.html',
                        ncyBreadcrumb: {
                            label: 'transportation'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/transportation.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })                    
                    .state('app.range.coverage', {
                        url: '/coverage/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: 'views/coverage.html',
                        ncyBreadcrumb: {
                            label: 'coverage'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/coverage.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                    .state('app.range.absenteeism', {
                        url: '/absenteeism/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: function ($stateParams){
                            if($stateParams.mp!=""){
                               return'views/mp_absenteeism_range.html'
                            } 
                            else{
                                return'views/absenteeism.html'
                            }                    
                        },
                        ncyBreadcrumb: {
                            label: 'absenteeism'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_absenteeism.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })
                    .state('app.range.payments', {
                        url: '/payments/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: 'views/payments.html',
                        ncyBreadcrumb: {
                            label: 'payments'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/payments.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })  
                    .state('app.range.grievance', {
                        url: '/grievance/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: 'views/grievance.html',
                        ncyBreadcrumb: {
                            label: 'grievance'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/td_grievance.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })  
                    .state('app.range.cleanliness', {
                        url: '/cleanliness/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?datebtn&from&to&daily',
                        templateUrl: 'views/cleanliness.html',
                        ncyBreadcrumb: {
                            label: 'cleanliness'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/cleanliness.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                    .state('app.today.performances',{
                        url: '/performances/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: function ($stateParams){
                                return'views/performances.html'
                        },
                        ncyBreadcrumb: {
                            label: 'performances'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/performances.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    }) 
                      .state('app.range.performances',{
                        url: '/performances/:state/:region/:district/:ulb/:contractor/:wp/:ward/:mp?from&to&daily',
                        templateUrl: function ($stateParams){
                                return'views/performances.html'
                        },
                        ncyBreadcrumb: {
                            label: 'performances'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                 function($ocLazyLoad) {
                                    return $ocLazyLoad.load([]).then(
                                        function() {
                                            return $ocLazyLoad.load(
                                            {
                                                serie: true,
                                                files: [
                                                    'app/controllers/performances.js'
                                                ]
                                            });
                                        }
                                    );
                                } 
                            ]
                        }
                    })                                                                                      							                                                                             							
            }
        ]
    )
    
  
        .run(
        [
            '$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
