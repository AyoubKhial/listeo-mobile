var infoBox_ratingType = 'star-rating';
function nearbyMap() {
    console.log($('#map').data('items')[0]);
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initMap);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    getLocation();

    var ib = new InfoBox();
    function locationData(locationURL, locationImg, locationTitle, locationAddress, locationRating, locationRatingCounter) {
        return ('' +
            '<a class="listing-img-container">' +
            '<div class="infoBox-close"><i class="fa fa-times"></i></div>' +
            '<img src="' + locationImg + '" alt="">' +
            '<div class="listing-item-content">' +
            '<h3>' + locationTitle + '</h3>' +
            '<span>' + locationAddress + '</span>' +
            '</div>' +
            '</a>' +
            '<div class="listing-content">' +
                '<div class="listing-title">' +
                    '<div class="star-rating">' +
                        '<div class="rating-counter">'+locationRatingCounter+' Reviews</div>' +
                        '<span class="stars alignright">' +
                            '<span style="width: ' + parseFloat(locationRating) / 5 * 100 + '%" ></span>'+
                        '</span>'+
                    '</div>'+
                '</div>' +
            '</div>')
    }
    var locations = [];
    
    for(var i=0 ;i<$('#map').data('items').length;i++){
        var l = parseFloat($('#map').data('items')[i].latitude);
        var l2 = parseFloat($('#map').data('items')[i].longitude);
        locations.push([locationData('listings-single-page.html', 'assets/images/items/'+$('#map').data('items')[i].url, $('#map').data('items')[i].name, $('#map').data('items')[i].adresse, $('#map').data('items')[i].rating, $('#map').data('items')[i].number_reviews), l, l2, $('#map').data('items')[i].type]);
        
    }console.log(locations);
    function numericalRating(ratingElem) {
        $(ratingElem).each(function() {
            var dataRating = $(this).attr('data-rating');
            if (dataRating >= 4.0) {
                $(this).addClass('high');
            } else if (dataRating >= 3.0) {
                $(this).addClass('mid');
            } else if (dataRating < 3.0) {
                $(this).addClass('low');
            }
        });
    }
    function starRating(ratingElem) {
        $(ratingElem).each(function() {
            var dataRating = $(this).attr('data-rating');
    
            function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
                return ('' +
                    '<span class="' + firstStar + '"></span>' +
                    '<span class="' + secondStar + '"></span>' +
                    '<span class="' + thirdStar + '"></span>' +
                    '<span class="' + fourthStar + '"></span>' +
                    '<span class="' + fifthStar + '"></span>');
            }
            var fiveStars = starsOutput('star', 'star', 'star', 'star', 'star');
            var fourHalfStars = starsOutput('star', 'star', 'star', 'star', 'star half');
            var fourStars = starsOutput('star', 'star', 'star', 'star', 'star empty');
            var threeHalfStars = starsOutput('star', 'star', 'star', 'star half', 'star empty');
            var threeStars = starsOutput('star', 'star', 'star', 'star empty', 'star empty');
            var twoHalfStars = starsOutput('star', 'star', 'star half', 'star empty', 'star empty');
            var twoStars = starsOutput('star', 'star', 'star empty', 'star empty', 'star empty');
            var oneHalfStar = starsOutput('star', 'star half', 'star empty', 'star empty', 'star empty');
            var oneStar = starsOutput('star', 'star empty', 'star empty', 'star empty', 'star empty');
            if (dataRating >= 4.75) {
                $(this).append(fiveStars);
            } else if (dataRating >= 4.25) {
                $(this).append(fourHalfStars);
            } else if (dataRating >= 3.75) {
                $(this).append(fourStars);
            } else if (dataRating >= 3.25) {
                $(this).append(threeHalfStars);
            } else if (dataRating >= 2.75) {
                $(this).append(threeStars);
            } else if (dataRating >= 2.25) {
                $(this).append(twoHalfStars);
            } else if (dataRating >= 1.75) {
                $(this).append(twoStars);
            } else if (dataRating >= 1.25) {
                $(this).append(oneHalfStar);
            } else if (dataRating < 1.25) {
                $(this).append(oneStar);
            }
        });
    }
    google.maps.event.addListener(ib, 'domready', function () {
        if (infoBox_ratingType = 'numerical-rating') {
            numericalRating('.infoBox .' + infoBox_ratingType + '');
        }
        if (infoBox_ratingType = 'star-rating') {
            starRating('.infoBox .' + infoBox_ratingType + '');
        }
    });
    var mapZoomAttr = $('#map').attr('data-map-zoom');
    var mapScrollAttr = $('#map').attr('data-map-scroll');
    if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
        var zoomLevel = parseInt(mapZoomAttr);
    } else {
        var zoomLevel = 5;
    }
    if (typeof mapScrollAttr !== typeof undefined && mapScrollAttr !== false) {
        var scrollEnabled = parseInt(mapScrollAttr);
    } else {
        var scrollEnabled = false;
    }
    var map;
    function initMap(position) {
        myLatlng = new google.maps.LatLng({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
        });
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomLevel,
            scrollwheel: scrollEnabled,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative',
            styles: [{
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#747474",
                    "visibility": "off"
                }, {
                    "lightness": "23"
                }]
            }, {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#f38eb0"
                }]
            }, {
                "featureType": "poi.government",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ced7db"
                }]
            }, {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffa5a8"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#c7e5c8"
                }]
            }, {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#d6cbc7"
                }]
            }, {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#c4c9e8"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#b1eaf1"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "lightness": "100"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }, {
                    "lightness": "100"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffd4a5"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffe9d2"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "weight": "3.00"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "weight": "0.30"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#747474"
                }, {
                    "lightness": "36"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#e9e5dc"
                }, {
                    "lightness": "30"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": "100"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#d2e7f7"
                }],
                "featureType": "poi",
                "stylers": [
                    { "visibility": "off" }
                ]
            }]
        });
        d();
        var singleMapIco = "<i class='fa fa-male' aria-hidden='true'></i>";
        var x = new CustomMarker(myLatlng, map, {
            marker_id: '1'
        }, singleMapIco);
    }
    function d(){
        $('.listing-item-container').on('mouseover', function () {
            var listingAttr = $(this).data('marker-id');
            if (listingAttr !== undefined) {
                var listing_id = $(this).data('marker-id') - 1;
                var marker_div = allMarkers[listing_id].div;
                $(marker_div).addClass('clicked');
                $(this).on('mouseout', function () {
                    if ($(marker_div).is(":not(.infoBox-opened)")) {
                        $(marker_div).removeClass('clicked');
                    }
                });
            }
        });
        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: false,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-134, -55),
            zIndex: null,
            boxStyle: {
                width: "270px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(25, 25),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };
        var markerCluster, overlay, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: 'white',
            url: '',
            height: 50,
            width: 50
        }];
        var markerIco;
        for (i = 0; i < locations.length; i++) {
            if(locations[i][3] == "restaurant")
            markerIco = '<i class="fa fa-cutlery"></i>';
            if(locations[i][3] == "hotel")
            markerIco = '<i class="fa fa-bed"></i>';
            var overlaypositions = new google.maps.LatLng(locations[i][1], locations[i][2]),
                overlay = new CustomMarker(overlaypositions, map, {
                    marker_id: i+1
                }, markerIco);
            allMarkers.push(overlay);
            google.maps.event.addDomListener(overlay, 'click', (function (overlay, i) {
                return function () {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = locations[i][0];
                    ib.close();
                    ib.open(map, overlay);
                    currentInfobox = locations[i][3];
                    google.maps.event.addListener(ib, 'domready', function () {
                        $('.infoBox-close').click(function (e) {
                            e.preventDefault();
                            ib.close();
                            $('.map-marker-container').removeClass('clicked infoBox-opened');
                        });
                    });
                }
            })(overlay, i));
        }
        var options = {
            imagePath: 'images/',
            styles: clusterStyles,
            minClusterSize: 2
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);
    
        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            controlDiv.className = "zoomControlWrapper";
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "custom-zoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "custom-zoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }
        var scrollEnabling = $('#scrollEnabling');
        $(scrollEnabling).click(function (e) {
            e.preventDefault();
            $(this).toggleClass("enabled");
            if ($(this).is(".enabled")) {
                map.setOptions({
                    'scrollwheel': true
                });
            } else {
                map.setOptions({
                    'scrollwheel': false
                });
            }
        })
        $("#geoLocation, .input-with-icon.location a").click(function (e) {
            e.preventDefault();
            geolocate();
        });
    
        function geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(pos);
                    map.setZoom(12);
                });
            }
        }
    }
    
    function CustomMarker(latlng, map, args, markerIco) {
        this.latlng = latlng;
        this.args = args;
        this.markerIco = markerIco;
        this.setMap(map);
    }
    CustomMarker.prototype = new google.maps.OverlayView();
    CustomMarker.prototype.draw = function () {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = document.createElement('div');
            div.className = 'map-marker-container';
            div.innerHTML = '<div class="marker-container">' +
                '<div class="marker-card">' +
                '<div class="front face">' + self.markerIco + '</div>' +
                '<div class="back face">' + self.markerIco + '</div>' +
                '<div class="marker-arrow"></div>' +
                '</div>' +
                '</div>'
            google.maps.event.addDomListener(div, "click", function (event) {
                $('.map-marker-container').removeClass('clicked infoBox-opened');
                google.maps.event.trigger(self, "click");
                $(this).addClass('clicked infoBox-opened');
            });
            if (typeof (self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
        if (point) {
            div.style.left = (point.x) + 'px';
            div.style.top = (point.y) + 'px';
        }
    };
    CustomMarker.prototype.remove = function () {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
            $(this).removeClass('clicked');
        }
    };
    CustomMarker.prototype.getPosition = function () {
        return this.latlng;
    };
    }