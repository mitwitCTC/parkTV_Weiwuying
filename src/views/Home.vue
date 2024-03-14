<template>
  <!-- class="d-flex justify-center align-center" -->
  <div id="main" class="d-flex align-start flex-column" style="height:100vh">
    <!-- TIME -->
    <div class="main text-center py-1" style="width:100vw">
      <b class="white--text" style="font-size:3.5vw">{{ time }}</b>
    </div>
    <!-- TITLE -->
    <div class="text-center" style="width:100vw ;margin-top: 3vw; margin-bottom: 3vw;">
      <div class="align-center">
        <v-img v-if="logo" :src="logo" class="mr-3" aspect-ratio="1" width="8vh" />
        <b style="font-size:7vw">{{ parkName }}</b>
      </div>
      <p class="price" v-html="code" style="font-size:4vw ;margin: 5vw 12vw 0vw 12vw ; padding:4vw">

      </p>
    </div>
    <!-- IMG -->
    <div class="in_pic" v-if="infos.image">
      <v-img :src="infos.image" width="100vw" aspect-ratio="2.4" position="center"></v-img>
    </div>

    <div class="in_pic" v-if="!infos.image">
      <v-carousel class="mx-auto" cycle style="width:100vw" height="42vw" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(ad, i) in carouselImage" :key="i" :src="ad"></v-carousel-item>
      </v-carousel>
    </div>
    <!-- INFOS -->
    <div class="text-center" style="width:100vw;">
      <!-- TITLE -->
      <!-- <p v-if="!infos.plate" style="font-size:9vw ;margin-top: 15vw;">{{ infos.message }}</p> -->

      <!-- Welcom -->
      <div v-if="infos.plate" style="margin-top: 8vw">
        <b style="font-size:9vw">{{ infos.plate }}</b>
        <br />
        <!-- Message -->
        <div>
          <span style="font-size:9vw">{{ infos.message }}</span>
        </div>
        <div style="font-size:8vw">
          <span v-if="!occupied">入場後 建議前往 {{ goToFloor }} 停放</span>
          <span v-if="occupied">車位已滿</span>
        </div>
      </div>
      <!-- Remaining spaces -->
      <div v-if="!infos.plate" style="font-size:6vw; margin-top: 5vh;">

        <v-carousel cycle hide-delimiters :show-arrows="false">
          <v-carousel-item v-for="(group, index) in groupedData" :key="index">
            <div class="data-group">
              <!-- floor -->
              <v-row class="mb-6 infoBg" no-gutters>
                <v-col>
                  樓層
                </v-col>
                <v-col>
                  <ul class="d-flex justify-space-around mr-1">
                    <li v-for="item in group" :key="item.floor" class="text-center">
                      {{ item.floor }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
              <v-row class="mb-6 white--text" no-gutters>
                <v-col>
                  剩餘車位
                </v-col>
                <v-col>
                  <ul class="d-flex justify-space-around mr-1">
                    <li v-for="item in group" :key="item.floor" class="text-center">
                      {{ item.count }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
              <!-- specific -->
              <v-row class="mb-6 infoBg" no-gutters>
                <v-col>
                  專用車格
                </v-col>
                <v-col>
                  <ul class="d-flex justify-space-around mr-1">
                    <li v-for="item in spacesInfo">{{ item.type === "2" ? "婦幼" : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "3" ? "身障" : null }}</li>
                    <li v-for="item in spacesInfo">{{ item.type === "4" ? "電動" : null }}</li>
                  </ul>
                </v-col>
              </v-row>
              <v-row class="mb-6 white--text" no-gutters>
                <v-col>
                  剩餘車位
                </v-col>
                <v-col>
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
    </div>

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
        "汽車<b style='font-size:1.2em'>每小時10元</b><br>每十小時最高收費<b style='font-size:1.2em'>200元</b>",
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
      }, 6000);
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
            break;
          } else if (item.count <= 0) {
            this.occupied = true;
            this.goToFloor = "車位已滿";
          }
        }
      }
    },
  },
};
</script>
<style>
#main {
  height: 100vh;
}

ul {
  list-style-type: none;
}

/* .in_pic {
  position: absolute;
  bottom: 25%;
} */

.infoBg {
  background-color: #70AD47 !important;
  color: black;
}

.price {
  border-style: solid;
}
</style>