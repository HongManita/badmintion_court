<template>
    <v-app-bar :elevation="2" app color="#E7DDF9">
        <h2 class="text-BadCourt">Badmintion Court </h2>
        <v-spacer></v-spacer>
        <v-btn class="button-login" color="#8B47FA" @click="login()">
            <Body2 class="text-login" >เข้าสู่ระบบ</Body2>
        </v-btn>
        <v-btn class="button-regis"  @click="register()">
            <Body2 class="text-regis">สมัครสมาชิก</Body2>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
    register() {
      this.$router.push({ path: "/register" }).catch(() => {});
    },
    login(){
        this.$router.push({ path: "/login" }).catch(() => {});
    }
  }
}
</script>
<style scoped>
.text-BadCourt{
    color: #8B47FA;
}
.button-login {
    border-radius: 15px;
    margin-right: 1%;
}

.text-login {
    color: #FFF;

}

.button-regis {
    border-radius: 15px;
    border: 2px solid #8B47FA;

}

.text-regis {
    color: #8B47FA;
}
</style>
