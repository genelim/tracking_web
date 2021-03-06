angular
    .module('app')
    .controller('AdminLocationController', AdminLocationController);

AdminLocationController.$inject = ['$http'];

function AdminLocationController($http){ 
    var vm = this;
    vm.lat = 0;
    vm.lng = 0; 
    vm.add_marker = add_marker;
    var map = new google.maps.Map(document.getElementById("map"));
    
    vm.marker = null;
    
    angular.element(document).ready(function () {
        var startPos;
        var geoSuccess = function(position) {
            startPos = position;
            vm.lat = startPos.coords.latitude;
            vm.lng = startPos.coords.longitude;
            var latlng = new google.maps.LatLng(vm.lat,vm.lng)
            map.setZoom(16); 
            map.setCenter(latlng);
            
            //////// changing icon
            new google.maps.Marker({
                position: new google.maps.LatLng(vm.lat,vm.lng),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7
                },
                draggable: true,
                map: map
            });
            ///////// get distance
            var pointA = new google.maps.LatLng(5.3335738, 100.4810813);
            console.log(google.maps.geometry.spherical.computeDistanceBetween(latlng, pointA)/1000);
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });
       
        function placeMarker(location) {
            var mark = new google.maps.Marker({
                position: location, 
                map: map
            });
            vm.marker = {lat : location.lat(), lng:location.lng()};
            $('#add_marker_modal').openModal();
            $('.lean-overlay').click(function(res){
                mark.setMap(null);
            })
        }
        get_marker()    
    });
    
    function get_marker(){
        $http.get('/api/location')
            .then(
            function(callback){
                // success callback
                for(var i = 0; i < callback.data.response.length; i++){
                    var LatLng = {  
                                    lat: callback.data.response[i].latitude, 
                                    lng: callback.data.response[i].longitude
                                 };
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        map: map,
                        title: callback.data.response[i].name
                    });
                    
                    createInfoWindow(marker, callback.data.response[i].name+ ' : '+callback.data.response[i].points)+'P';
                }
                var infoWindow = new google.maps.InfoWindow();
                function createInfoWindow(marker, popupContent) {
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent(popupContent);
                        infoWindow.open(map, this);
                    });
                }
            }, 
            function(callback){
                // failure callback
                Materialize.toast('Server Error', 2000);
                console.log(callback)
            }
        );
    }
   
    function add_marker(){
        $http.post('/api/location',vm.marker)
            .then(
            function(callback){
                // success callback
                if(callback.data.response === 'Server Error' || callback.data.response === 'Location Existed'){
                    Materialize.toast(callback.data.response, 2000);
                }else{
                    Materialize.toast('Location Added', 2000);
                }
                get_marker() 
            }, 
            function(callback){
                // failure callback
                Materialize.toast('Server Error', 2000);
                console.log(callback)
            }
        );
    }
}