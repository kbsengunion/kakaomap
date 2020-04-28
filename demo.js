var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    myFunction(myObj);
//    document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "test.json", true);
xmlhttp.send();

function myFunction(arr) {
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
          center: new kakao.maps.LatLng(arr[0].lat, arr[0].lng), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
      };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커를 표시할 위치입니다
  var position =  new kakao.maps.LatLng(arr[0].lat, arr[0].lng);

  // 마커를 생성합니다
  console.log(arr[0].site+":"+arr[0].lat+","+arr[0].lng);
  var marker = new kakao.maps.Marker({
    position: position,
    clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
  });

  // 아래 코드는 위의 마커를 생성하는 코드에서 clickable: true 와 같이
  // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
  // marker.setClickable(true);

  // 마커를 지도에 표시합니다.
  marker.setMap(map);



  // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  var iwContent = '<table width=480px></table>';
      iwContent += '<div style="TEXT-ALIGN:center">'+arr[0].site+'</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwContent += '<video id="example-video" width="480" height="270" class="video-js" controls>';
      iwContent += '<source src="http://hls.live.kbskme.gscdn.com/www_subtitle-1tv/_definst_/subtitle-1tv_5.stream/playlist.m3u8?_lsu_sa_=3dc505350c0535234887970e3931833343566102578ab4b967d4db327087331961d77e873413dd6ccce73e151bb1c3de0be3cfce3395966b1b2d2e7602abafa965d23ad968c6f193b0e6f9d775983fbd" type="application/x-mpegURL">';
      iwContent += '</video>';
  var  iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
      content : iwContent,
      removable : iwRemoveable
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
        var player = videojs('example-video');
        player.play();
  });
}
