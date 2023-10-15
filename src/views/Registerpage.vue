<template>
  <div>
    <Appbar />
    <div
      style="height: 100%; width: 100%;  display: flex; justify-content: center; align-items: center;"
    >
      <v-form
        ref="LoginForm"
        :lazy-validation="lazy"
        style="width: 100%; height:100%; display: flex; justify-content: center; align-items: center; margin-top: 30px; margin-bottom: 30px;"
        @submit.prevent="registerCust()"
      >
        <v-card
          style="border: 5px solid rgba(139, 71, 250, 0.34) ;
border-radius: 30px; width: 30%; height:auto; "
        >
          <div style="display: flex; justify-content: center; align-items: center;">
            <v-card-title style="font-size: 25px; color: #8B47FA;">สมัครสมาชิก</v-card-title>
          </div>
          <v-container>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstname"
                  :rules="Rules.firstnameRules"
                  label="ชื่อ"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastname"
                  :rules="Rules.lastnameRules"
                  label="นามสกุล"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="tel"
                  :rules="Rules.telRules"
                  label="เบอร์โทรศัพท์"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="username"
                  :rules="Rules.usernameRules"
                  label="ชื่อผู้ใช้"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="password"
                  :rules="Rules.passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  @click:append="show1 = !show1"
                  label="รหัสผ่าน"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-btn block rounded color="#8B47FA" class="white--text" type="submit">สมัครสมาชิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Appbar from "../components/Appbar.vue";
import axios from "axios";

export default {
  name: "RegisPage",
  components: {
    Appbar
  },
  data() {
    return {
      lazy: false,
      firstname: "",
      lastname: "",
      tel: "",
      username: "",
      password: "",

      show1: false,
        show2: true,
      Rules: {
        usernameRules: [v => !!v || "กรุณากรอกชื่อผู้ใช้งาน"],
        passwordRules: [v => !!v || "กรุณากรอกรหัสผ่าน"],
        firstnameRules: [v => !!v || "กรุณากรอกชื่อ"],
        lastnameRules: [v => !!v || "กรุณากรอกนามสกุล"],
        telRules: [v => !!v || "กรุณากรอกเบอร์โทรศัพท์"],
        
      }
    };
  },
  methods: {
    async registerCust() {
      if (
        !this.firstname ||
        !this.lastname ||
        !this.tel ||
        !this.username ||
        !this.password
      ) {
        await Swal.fire({
          title: "ข้อมูลไม่ครบถ้วน",
          text: "โปรดกรอกข้อมูลให้ครบทุกช่อง",
          icon: "warning",
          confirmButtonText: "ตกลง"
        });
        return;
      }
      
      try {
        const data = {
          firstName: this.firstname,
          lastName: this.lastname,
          tel: this.tel,
          username: this.username,
          password: this.password
        };

        const response = await axios.post(
          "http://localhost:9000/customer",
          data
        );

        if (response.status === 201) {
          await Swal.fire({
            title: "สมัครสมาชิกสำเร็จ!",
            text: "เข้าสู่ระบบเพื่อทำการจองสนามแบตมินตัน",
            icon: "success",
            confirmButtonText: "ตกลง"
          });
          this.$router.push("/login");
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Unable to register user.",
          icon: "error",
          confirmButtonText: "Confirm"
        });

        console.error("Error data:", error);
      }
    }
  }
};
</script>
<style scoped>
</style>