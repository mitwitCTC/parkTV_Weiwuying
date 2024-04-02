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

    <div class="in_pic" v-if="!infos.image">
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
      } if (respone.seconds) {
        this.seconds = parseInt(respone.seconds);
      }
    }
  },
  mounted() {
    this.time = `${this.$time.now("y2m2d2")} ${this.$time.now("h2M2")}`;
    this.getInfos();

    // 本地端測試進出場資料
    // const respone = {
    //   plate: "AAA-1234",
    //   message: "Your message here", // Add any other properties you want to simulate
    //   image: "data:image/jpeg;base64,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", // Add if necessary
    //   seconds: 12
    // };
    // this.infos.plate = respone.plate;
    // this.infos.message = respone.message;
    // if (respone.image) {
    //   this.infos.image = respone.image;
    // }
    // this.seconds = parseInt(respone.seconds); // 更新 seconds 的值
    // this.clear();
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
        // 預防車辨送兩次資料
        if (this.infos.plate && this.infos.image) {
          if (!respone.plate || !respone.image) {
            return
          }
        }
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