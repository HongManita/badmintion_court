<template>
  <div>
    <Appbar />
    <div>
      <div class="text-welcome" margin-top="5%">
        <h1>ยินดีต้อนรับ</h1>
      </div>
      <div class="text-welcome" margin-top="5%">
        <body1 class="text-pleaseLogin">โปรดเข้าสู่ระบบเพื่อจองสนามแบตมินตันกับเรา</body1>
      </div>
      <div class="div-button-login">
        <v-btn x-large class="button-login-homepage" color="#8B47FA">
          <Body2 class="text-login" @click="login()">เข้าสู่ระบบ</Body2>
        </v-btn>
      </div>
      <div class="div-if-regis">
        <body2 class="text--if-regis">----------- หากคุณยังไม่เป็นสมาชิก ------------</body2>
      </div>
      <div class="div-button-regis">
        <v-btn x-large class="button-regis-homepage" @click="register()">
          <Body2 class="text-regis">สมัครสมาชิก</Body2>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Appbar from "../components/Appbar.vue";
export default {
  name: "HomeView",
  components: {
    Appbar
  },
  data: () => ({
    username: ""
  }),

  created() {
    this.$EventBus.$on("getUsername", this.getUsername);
    this.getUsername();
  },
  methods: {
    getUsername() {
      if (localStorage.getItem("username") !== null) {
        this.username = localStorage.getItem("username");
      } else {
        this.username = "Vuetify";
      }
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    login() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>


<style>
.text-welcome {
  color: #8b47fa;
  width: 100;
  display: flex;
  justify-content: center;
  margin-top: 2%;
}

h1 {
  font-size: 64px;
}

.text-pleaseLogin {
  font-size: 20px;
  color: #333333;
}

.div-button-login {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}

.text-login {
  color: #ffffff;
}
.div-if-regis {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
.text--if-regis {
  color: #7c7b7b;
}
.div-button-regis {
  display: flex;
  justify-content: center;
}

.button-regis-homepage {
  margin-top: 5%;
  border: 2px solid #8b47fa;
}
.text-regis {
  color: #8b47fa;
}
</style>