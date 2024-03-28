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
      </div>
    </div>
    <!-- IMG -->
    <div class="in_pic" v-if="infos.image">
      <v-img :src="infos.image" width="100vw" aspect-ratio="2.4" position="center"></v-img>
    </div>

    <div class="in_pic" v-if="!infos.image && !infos.plate">
      <v-carousel class="mx-auto" cycle style="width:100vw" height="42vw" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(ad, i) in carouselImage" :key="i" :src="ad"></v-carousel-item>
      </v-carousel>
    </div>
    <div class="in_pic mt-5" v-if="!infos.image">
      <v-carousel class="mx-auto" cycle style="width:100vw" height="42vw" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(ad, i) in carouselImage2" :key="i" :src="ad"></v-carousel-item>
      </v-carousel>
    </div>


  </div>
</template>
<script>
import default_img from "../images/default_img3.png";
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
      if (respone.carousel2) {
        this.carouselImage2 = respone.carousel2;
      }
      if (respone.welcome) {
        this.welcome = respone.welcome;
        this.infos.message = this.welcome;
      }
      if (respone.logo) {
        this.logo = respone.logo;
      }if (respone.seconds) {
        this.seconds = parseInt(respone.seconds);
      }
    }
  },
  mounted() {
    this.time = `${this.$time.now("y2m2d2")} ${this.$time.now("h2M2")}`;
    this.getInfos();
    setInterval(() => {
      this.time = `${this.$time.now("y2m2d2")} ${this.$time.now("h2M2")}`;
    }, 10000);
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
      carouselImage2: [default_img],
      seconds: "",
      infos: {
        message: "歡迎光臨",
        plate: null,
        image: null
      },
    };
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
      }, this.seconds * 1000);
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