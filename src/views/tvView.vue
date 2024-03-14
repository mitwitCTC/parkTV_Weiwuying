<template>
  <div id="main">
    <v-container fluid>
      <v-row class="d-flex justify-center" style="font-size:1.5vw">{{ time }}</v-row>
      <v-row class="d-flex justify-center font-weight-bold" style="font-size:4vw;margin-top:2vh">
        <div class="d-flex align-center">
          <v-img v-if="logo" :src="logo" class="mr-3" aspect-ratio="1" width="8vh" />
          {{ parkName }}
        </div>
      </v-row>
      <!--
      <v-row class="price d-flex justify-center align-center" style="font-size:2vw;margin-top:2vh">
        汽車
        <b style="font-size:1.2em">每小時{{amount}}元</b>
        ，每十小時最高收費
        <b style="font-size:1.2em">{{max_amount}}元</b>
      </v-row>-->
      <v-row v-html="code" class="price d-flex justify-center align-center" style="font-size:2vw;margin-top:2vh"></v-row>

      <!-- Default -->
      <v-row v-if="false" class="d-flex justify-center font-weight-bold"
        style="font-size:6.5vw;margin-top:3vh">歡迎入場</v-row>

      <!-- 一般車號 -->
      <v-row v-if="!infos.plate" class="d-flex justify-center align-center font-weight-bold"
        style="font-size:6.5vw;margin-top:3vh">{{ infos.message }}</v-row>

      <!-- VIP -->
      <v-row v-if="infos.plate" class="d-flex justify-center align-center font-weight-bold" style="margin-top:3vh">
        <v-col cols="6" class="pa-0 text-center" style="font-size:6.5vw">{{ infos.plate }}</v-col>
        <v-col cols="6" class="pa-0 text-center" style="font-size:5vw">{{ infos.message }}</v-col>
      </v-row>

      <v-row v-if="infos.image" class="mx-auto" style="width:60vw;margin-top:4vh">
        <v-img :src="infos.image" aspect-ratio="2.4" position="top"></v-img>
      </v-row>
      <v-row v-if="infos.image" class="d-flex justify-center" style="font-size:6.5vw">
        <span v-if="!occupied">入場後 建議前往 {{ goToFloor.replace("-", "B") }} 停放</span>
        <span v-if="occupied">車位已滿</span>
      </v-row>

      <v-row v-if="!infos.image">
        <v-carousel class="mx-auto" cycle style="width:60vw;margin-top:4vh;" height="25vw" hide-delimiters
          :show-arrows="false">
          <v-carousel-item v-for="(ad, i) in carouselImage" :key="i" :src="ad"></v-carousel-item>
        </v-carousel>
      </v-row>

      <!-- Remaining spaces -->
      <div v-if="!infos.plate" class="mt-8">
        <v-carousel cycle hide-delimiters :show-arrows="false">
          <v-carousel-item v-for="(group, index) in groupedData" :key="index">
            <div class="data-group"  style="color: white;">
              <v-row class="mx-auto d-flex justify-center align-center text-center px-5 text-h4">
                <v-col class="bg"> 樓層 </v-col>
                <v-col class="bg">
                  <ul class="d-flex justify-space-around">
                    <li v-for="item in group" :key="item.floor" class="text-center">
                      {{ item.floor }}
                    </li>
                  </ul>
                </v-col>
                <v-col class="bg"> 專用車位 </v-col>
                <v-col class="bg">
                  <ul class="d-flex justify-space-around mr-1">
                    <li v-for="item in spacesInfo">{{ item.type === "2" ? "婦幼" : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "3" ? "身障" : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "4" ? "電動" : null }}</li>
                  </ul>
                </v-col>
              </v-row>
              <v-row class="mx-auto d-flex justify-center align-center text-center px-5 text-h4">
                <v-col class="bg"> 剩餘車位 </v-col>
                <v-col class="bg">
                  <ul class="d-flex justify-space-around">
                    <li v-for="item in group" :key="item.floor">{{ item.count }}</li>
                  </ul>
                </v-col>
                <v-col class="bg"> 剩餘車位 </v-col>
                <v-col class="bg">
                  <ul class="d-flex justify-space-around">
                    <li v-for="item in spacesInfo">{{ item.type === "2" ? item.count : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "3" ? item.count : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "4" ? item.count : null }}</li>
                  </ul>
                </v-col>
              </v-row>
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-container>
  </div>
</template>
<script>
import default_img from "../images/default_img3.png";
import axios from 'axios';
const Api = 'http://localhost:1100';
export default {
  sockets: {
    getSet: function (respone) {
      if (respone.code) {
        this.code = respone.code;
      }
      if (respone.parkName) {
        this.parkName = respone.parkName;
      }
      if (respone.carousel) {
        this.carouselImage = respone.carousel;
      }
      if (respone.welcome) {
        this.welcome = respone.welcome;
        this.infos.message = this.welcome;
      }
      if (respone.logo) {
        this.logo = respone.logo;
      }
    }
  },
  mounted() {
    this.time = `${this.$time.now("y2m2d2")} ${this.$time.now("h2M2")}`;
    this.getInfos();
    setInterval(() => {
      this.time = `${this.$time.now("y2m2d2")} ${this.$time.now("h2M2")}`;
    }, 10000);
    this.getSpacesInfo();
    setInterval(() => {
      this.getSpacesInfo()
    }, 12000);
    this.checkFloorSpaces();
  },
  data() {
    return {
      time: "2020-03-26 11:30",
      parkName: "停車場",
      code:
        "汽車<b style='font-size:1.2em'>每小時10元</b>，每十小時最高收費<b style='font-size:1.2em'>200元</b>",
      timeCheck: null,
      amount: 10,
      max_amount: 200,
      logo: "",
      welcome: "歡迎光臨",
      carouselImage: [default_img],
      infos: {
        message: "歡迎光臨",
        plate: null,
        image: null
      },
      spacesInfo: [
        {
          floor: "3",
          type: "1",
          count: 33
        },
        {
          floor: "2",
          type: "1",
          count: 22
        },
        {
          floor: "1",
          type: "1",
          count: 11
        },
        {
          floor: "-1",
          type: "1",
          count: 1
        },
        {
          floor: "-1",
          type: "2",
          count: 2
        },
        {
          floor: "-1",
          type: "3",
          count: 1
        },
        {
          floor: "-1",
          type: "4",
          count: 3
        },
        {
          floor: "-2",
          type: "1",
          count: 0
        },
        {
          floor: "-3",
          type: "1",
          count: 0
        },
      ],
      errorMessage: "",
      organizedFloorInfo: [],
      organizedSpecificInfo: [],
      occupied: false,
      goToFloor: "",
    };
  },
  computed: {
    groupedData() {
      const groupSize = 4;
      const groupedData = [];

      for (let i = 0; i < this.organizedFloorInfo.length; i += groupSize) {
        groupedData.push(this.organizedFloorInfo.slice(i, i + groupSize));
      }
      return groupedData;
    },
  },
  methods: {
    getInfos() {
      this.sockets.subscribe("getInfo", respone => {
        clearTimeout(this.timeCheck);
        this.infos.plate = respone.plate;
        this.infos.message = respone.message;
        if (respone.image) {
          this.infos.image = respone.image;
        }
        this.clear();
      });
    },

    clear() {
      this.timeCheck = setTimeout(() => {
        this.infos["message"] = this.welcome;
        this.infos["plate"] = null;
        this.infos["image"] = null;
      }, 60000);
    },
    getSpacesInfo() {
      axios
        .get(`${Api}/park/floor`)
        .then((response) => {
          if (response.errorCode === 500) {
            this.errorMessage = response.message;
          } else {
            this.spacesInfo = response.data;
            this.getOrganizedFloorInfo();
            this.getOrganizedSpecificInfo();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getOrganizedFloorInfo() {
      this.organizedFloorInfo = this.spacesInfo
        // filter type (1) and sort
        .filter(space => space.type === "1")
        .sort((a, b) => b.floor - a.floor)
        .map(space => {
          if (space.floor > 0) {
            space.floor = "F" + space.floor;
          } else {
            space.floor = space.floor.replace("-", "B");
          }
          return space;
        });
    },
    getOrganizedSpecificInfo() {
      this.organizedSpecificInfo = this.spacesInfo
        .filter(space => space.type === "2" || space.type === "3" || space.type === "4");
      this.organizedSpecificInfo.sort((a, b) => {
        const typeOrder = { "2": 1, "3": 2, "4": 3 };
        return typeOrder[a.type] - typeOrder[b.type];
      });
    },
    checkFloorSpaces() {
      this.getOrganizedFloorInfo();
      if (this.organizedFloorInfo) {
        for (let i = 0; i < this.organizedFloorInfo.length; i++) {
          const item = this.organizedFloorInfo[i];
          if (item.count > 0) {
            this.occupied = false
            this.goToFloor = item.floor;
            break; // 停止判断
          } else if (item.count <= 0) {
            this.occupied = true;
            this.goToFloor = "車位已滿";
          }
        }
      }
    },
  }
};
</script>
<style>
#main {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6)), url("../images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

.price {
  background-color: rgba(207, 174, 25, 0.6);
  padding-top: 1.3vh;
  padding-bottom: 1.3vh;
}

ul {
  list-style-type: none;
}
</style>