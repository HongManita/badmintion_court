<template>
  <div>
    <v-app-bar :elevation="2" app color="#E7DDF9">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="burger-icon" style="color: #8b47fa"></v-app-bar-nav-icon>
      <h2 class="text-addmin">Admin</h2>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list style="margin-top: 5px">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigate(item.value)"
          style="border: 2px solid #ece1ed;
    border-radius: 10px; margin: 9px;"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="login()" class="logout-button">
          <v-list-item-title style="color: red">ออกจากระบบ</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    methods: {
    register() {
      this.$router.push({ path: "/register" }).catch(() => {});
    },
    login() {
      this.$router.push({ path: "/login" }).catch(() => {});
    },
    navigate(value) {
      if (value === "editreserve") {
        this.$router.push({ path: "/editcourt" }).catch(() => {});
      } else if (value === "resultreserve") {
        this.$router.push({ path: "/resultreserve" }).catch(() => {});
      }
      this.drawer = false;
    }
  },
  data() {
    return {
      drawer: false,
      group: null,
      items: [
        {
          title: "จัดการสนาม",
          value: "editreserve"
        },
        {
          title: "รายงานการจอง",
          value: "resultreserve"
        }
      ]
    };
  }
};

</script>
 
<style scoped>
.text-addmin {
  color: #8b47fa;
}
.logout-button {
  margin-top: 420px;
  border: 2px solid #ff0000;
  border-radius: 10px;
  margin-left: 9px;
  margin-right: 9px;
}
</style>