<template>
  <div style="width:100%; height: 100%; display: flex; justify-content: center; align-items: center;">
    <Appbar />
    <div
      style="height: 100%; width: 100%;  display: flex; justify-content: center; align-items: center;"
    >
      <v-form
        ref="LoginForm"
        :lazy-validation="lazy"
        style="width: 100%; height:100%; display: flex; justify-content: center; align-items: center;"
      >
        <v-card
          style="border: 5px solid rgba(139, 71, 250, 0.34) ;
border-radius: 30px; width: 30%; height:auto; padding-bottom: 20px "
        >
          <div style="display: flex; flex-direction: column; align-items: center;">
            <h6 style="font-size: 25px; color: #8B47FA;  margin-top: 12px;">เข้าสู่ระบบ</h6>
            <p style="font-size: 15px; color: #8B47FA;">(สำหรับผู้ดูแลระบบ)</p>
          </div>

          <v-card-text>
            <!-- username -->
            <v-row dense>
              <v-col cols="12" align="start">
                <v-text-field
                  label="ชื่อผู้ใช้"
                  outlined
                  v-model="username"
                  :rules="Rules.usernameRules"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- password -->
            <v-row dense>
              <v-col cols="12" align="start">
                <v-text-field
                  label="รหัสผ่าน"
                  outlined
                  v-model="password"
                  :rules="Rules.passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn block rounded color="#8B47FA" class="white--text" @click="loginManager()">เข้าสู่ระบบ</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script>
import Appbar from "../../components/Appbar.vue";
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: "LoginPage",
  components: {
    Appbar
  },
  data() {
    return {
      lazy: false,
      username: "",
      password: "",
      show1: false,
        show2: true,

      Rules: {
        usernameRules: [v => !!v || "กรุณากรอกชื่อผู้ใช้งาน"],
        passwordRules: [v => !!v || "กรุณากรอกรหัสผ่าน"]
      }
    };
  },
  methods: {
    async loginManager() {
      try {
        const response = await axios.post('http://localhost:9000/loginManager', {
          m_username: this.username,
          m_password: this.password,
        });
        if (response.status == 200) {
          this.open = false;
          Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ!',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
          }).then(() => {
            localStorage.setItem('dataUser', JSON.stringify(response.data));
          
          });
          this.$router.push("/editcourt");
        }
      } catch (error) {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          text: 'โปรดตรวจสอบชื่อผู้ใช้ และรหัสผ่านอีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
        console.error('Error login:', error);
      }
    },
    login() {
      localStorage.setItem("username", this.username);
      this.$EventBus.$emit("getUsername");
      this.$EventBus.$emit("checkLogin");
      this.$router.push({ path: "/" }).catch(() => {});
    },
    loginaddmin() {
      this.$router.push({ path: "/loginaddmin" }).catch(() => {});
    },

  }
};
</script>

<style>
.mx-auto {
  margin-top: 5%;
  border: 5px solid rgba(139, 71, 250, 0.34);
  display: flex;
  justify-content: center;
}
.text-addmin-login {
  display: flex;
  justify-content: right;
  color: gray;
  text-decoration: underline;
}
</style>