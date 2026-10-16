<template>
  <div>
    <div id="map" class="map__container"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

export default {
  name: "KakaoMap",
  props: {
    selectedStadiumIndex: {
      type: Number,
      default: null
    },
    showStadium: {
      type: Boolean,
      default: false
    },
    makeMarkerWithClick: {
      type: Boolean,
      default: false
    },
    value: {
      //{latitude: ..., longitude: ...}
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      map: null,
      places: null,
      infowWindows: null,
      new_markers: [],
      markers: [], // 여기다가 풋살장 위치 정보 받아와야함
      markerDefualt: null, // 지도 클릭시 보여주는 마커 value와 연동 할 것

      defaultImageSrc:
        "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/map/maps-and-location.png",
      defaultMarkerImage: null,
      imageSrc:
        "https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-nnnn/map/red-pin.png",
      selectedMarkerImage: null,
      selectedMarkerIndex: null
    };
  },
  computed: {
    ...stadiuMapState(["searchResult"])
  },
  watch: {
    searchResult(val) {
      if (this.showStadium) {
        this.markers.forEach(marker => {
          marker.setMap(null);
        });
        this.makers = [];
        this.displayAllMarker(this.searchResult);
        this.addInfowindowToMarkers(this.searchResult);
        this.selectedMarkerIndex = null;
        this.selectedStadiumIndex = null;
      }
    },
    selectedStadiumIndex(val) {
      if (this.selectedMarkerIndex != null) {
        this.changeMarkerImage(this.selectedMarkerIndex, false);
      }
      this.selectedMarkerIndex = val;

      this.changeMarkerImage(val, true);

      this.infowWindows.forEach(infoWindow => {
        infoWindow.setMap(null);
      });
      this.map.setCenter(this.markers[val].getPosition());
      this.map.setLevel(3);
    },
    value(val) {
      let { markerDefualt } = this;
      if (val != undefined) {
        let kakaoPosition = new kakao.maps.LatLng(
          Number(val.latitude),
          Number(val.longitude)
        );
        // 마커 위치를 클릭한 위치로 옮깁니다
        markerDefualt.setPosition(kakaoPosition);

        this.map.setCenter(kakaoPosition);
      }
    }
  },
  async mounted() {
    this.initMarkerImage();

    this.initMap();
    this.initMarker();

    if (this.showStadium) {
      await this.select_stadium();
      this.displayAllMarker(this.searchResult);
      this.addInfowindowToMarkers(this.searchResult);
    }
    if (this.makeMarkerWithClick) {
      this.addEventMakeMarkerWithClick();
    }
  },
  methods: {
    ...stadiumMapActions(["select_stadium"]),
    initMap() {
      let { map, defaultMarkerImage, value } = this;

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5642, 127.001),
        level: 8
      };

      this.map = new kakao.maps.Map(container, options);

      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
    initMarker() {
      let { map, defaultMarkerImage, value } = this;
      let kakaoPosition = map.getCenter();
      let markerMap = null;
      if (value != undefined) {
        kakaoPosition = new kakao.maps.LatLng(
          Number(value.latitude),
          Number(value.longitude)
        );
        markerMap = map;
      }

      this.markerDefualt = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: kakaoPosition,
        image: defaultMarkerImage,
        map: markerMap
      });
    },

    addEventMakeMarkerWithClick() {
      let { map, markerDefualt } = this;
      let _this = this;
      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      kakao.maps.event.addListener(map, "click", function(mouseEvent) {
        markerDefualt.setMap(map);
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        markerDefualt.setPosition(latlng);

        _this.value = { latitude: latlng.getLat(), longitude: latlng.getLng() };
        _this.$emit("input", _this.value);
      });
    },
    initMarkerImage() {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(48, 48);

      // 마커 이미지를 생성합니다
      this.selectedMarkerImage = new kakao.maps.MarkerImage(
        this.imageSrc,
        imageSize
      );
      this.defaultMarkerImage = new kakao.maps.MarkerImage(
        this.defaultImageSrc,
        imageSize
      );
    },
    remove() {
      this.markers[this.selectedMarkerIndex].setMap(null);
    },
    show() {
      let markerPosition = this.searchResult[this.selectedMarkerIndex];
      const kakaoPosition = new kakao.maps.LatLng(
        Number(markerPosition.latitude),
        Number(markerPosition.longitude)
      );
      let new_maker = new kakao.maps.Marker({
        map: this.map, // marker.setMap(map)하는 과정을 생략
        position: kakaoPosition,
        clickable: true,
        image: this.selectedMarkerImage
      });
    },
    addMarker(map, position, clickable, image) {
      // 마커 등록 https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
      var marker = new kakao.maps.Marker({
        map: map,
        position: position,
        clickable: clickable,
        image: image
      });
    },
    changeMapSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    changeMarkerImage(index, isStarImage) {
      // https://apis.map.kakao.com/web/documentation/#Marker
      // setImage method를 이용해서 다시 짤 것
      let marker = this.markers[index];
      if (marker) {
        if (isStarImage) {
          marker.setImage(this.selectedMarkerImage);
        } else {
          marker.setImage(this.defaultMarkerImage);
        }
      }
    },

    displayAllMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      let kakaoPositions = this.makeKakaoPositions(markerPositions);

      this.markers = kakaoPositions.map(
        position =>
          new kakao.maps.Marker({
            map: this.map, // marker.setMap(map)하는 과정을 생략
            position,
            clickable: true,
            image: this.defaultMarkerImage
          })
      );
    },
    makeKakaoPositions(positions) {
      let kakaoPositions = [];

      for (let i = 0; i < positions.length; i++) {
        let position = new kakao.maps.LatLng(
          Number(positions[i].latitude),
          Number(positions[i].longitude)
        );
        kakaoPositions.push(position);
      }
      return kakaoPositions;
    },
    addInfowindowToMarkers(markerPositions) {
      let _this = this;
      this.infowWindows = [];
      for (let i = 0; i < markerPositions.length; i++) {
        let { id, nick_name, latitude, longitude } = markerPositions[i];
        let marker = this.markers[i];
        let infoWindow = this.makeInfoWindow(nick_name, latitude, longitude);
        this.infowWindows.push(infoWindow);

        // 클릭 이벤트 등록
        // https://apis.map.kakao.com/web/sample/addMarkerClickEvent/
        kakao.maps.event.addListener(marker, "click", function() {
          // 기존 윈도우 닫기
          _this.infowWindows.forEach(infoWindow => {
            infoWindow.setMap(null);
          });
          // 클릭한거 열기
          infoWindow.setMap(_this.map);

          _this.$emit("MapSelected", id);
        });
      }
    },
    makeInfoWindow(nick_name, latitude, longitude) {
      let iwContent = `<div class="customoverlay"> 
                          <a href="https://map.kakao.com/link/to/${nick_name},${latitude},${longitude}" target="_blank">
                             <span class="title"> ${nick_name} </span>
                          </a> 
                        </div>`;
      let iwPosition = new kakao.maps.LatLng(
        Number(latitude),
        Number(longitude)
      );
      let infoWindow = new kakao.maps.CustomOverlay({
        position: iwPosition,
        content: iwContent,
        yAnchor: 2 // 위치를 y축방향으로 이동 시킨다
      });
      return infoWindow;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="@/assets/scss/components/stadium/map.scss"></style>
