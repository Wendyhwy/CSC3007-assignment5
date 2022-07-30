fetch('https://api.data.gov.sg/v1/environment/psi')
	.then((response) => response.json())
	.then(function(data) { 
        console.log(data);

        var scale_marker = 45

        // map 
        let tiles = new L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 18,
            minZoom: 12,
            //Do not remove this attribution
            attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
                        'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
        });
    
    
        let map = new L.Map("map", {
            center: [1.347833, 103.842357], 
            zoom: 12,
            maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
        })
        .addLayer(tiles);

        west_data = data.region_metadata[0].label_location
        east_data = data.region_metadata[2].label_location
        central_data = data.region_metadata[3].label_location
        south_data = data.region_metadata[4].label_location
        north_data = data.region_metadata[5].label_location

        psi_data = data.items[0].readings.psi_twenty_four_hourly;

        // creating markers with text
        L.circle([west_data.latitude, west_data.longitude], psi_data.west * scale_marker).addTo(map)
            .bindPopup("West PSI: " + String(psi_data.west))
            .setStyle({color: 'black'})
            .setStyle({fillColor: 'grey'});
        L.circle([east_data.latitude, east_data.longitude], psi_data.east * scale_marker).addTo(map)
            .bindPopup("East PSI: " + String(psi_data.east))
            .setStyle({color: 'black'})
            .setStyle({fillColor: 'grey'});
        L.circle([central_data.latitude, central_data.longitude], psi_data.central * scale_marker).addTo(map)
            .bindPopup("Central PSI: " + String(psi_data.central))
            .setStyle({color: 'black'})
            .setStyle({fillColor: 'grey'});
        L.circle([south_data.latitude, south_data.longitude], psi_data.south * scale_marker).addTo(map)
            .bindPopup("South PSI: " + String(psi_data.south))
            .setStyle({color: 'black'})
            .setStyle({fillColor: 'grey'});
        L.circle([north_data.latitude, north_data.longitude], psi_data.north * scale_marker).addTo(map)
            .bindPopup("North PSI:" + String(psi_data.north))
            .setStyle({color: 'black'})
            .setStyle({fillColor: 'grey'});
        
        // timestamp
        updateTimestamp = data.items[0].update_timestamp;
        updateTimestamp = moment(updateTimestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
        console.log(updateTimestamp);

        document.getElementById("time").innerHTML = "Last Updated: " + updateTimestamp;



});
