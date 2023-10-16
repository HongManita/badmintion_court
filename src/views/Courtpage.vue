<template>
<div>
  <AppbarCust />
  <div class="text-table">
    <h2>ตารางการใช้งานสนาม</h2>
  </div>
  <div style="padding-left: 100px">
    <body style="font-size: 20px;">ประจำวันที่ : {{ currentDate }}</body>
  </div>

  <div class="table-reserve">
    <v-simple-table fixed-header height="600px">
      <template v-slot:default>
        <thead class="table-head">
          <tr>
            <th class="text-center" style="font-size: 15px">16.00-17.00น.</th>
            <th class="text-center" style="font-size: 15px">17.00-18.00น.</th>
            <th class="text-center" style="font-size: 15px">18.00-19.00น.</th>
            <th class="text-center" style="font-size: 15px">19.00-20.00น.</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tr-body">
            <td v-for="(item, index) in desserts.slice(0, 4)" :key="index">
              <v-btn
                depressed
                color="#8b47fa"
                class="button-court"
                v-bind="attrs"
                v-on:click="openDialog(item)"
                style="height: 80%;  border-radius: 10px;  color: white; font-size: 15px;"
              >
                <div style="padding-top: 10px;">
                  <p>{{ item.court_name }}</p>
                  <p
                    :style="{ color: item.court_status.status_id === 1 ? '#000000' : 'white', fontSize: '23px' }"
                  >{{ item.court_status.status_name }}</p>
                </div>
              </v-btn>
            </td>
          </tr>
          <tr class="tr-body">
            <td v-for="(item, index) in desserts.slice(4, 8)" :key="index">
              <v-btn
                depressed
                color="#8b47fa"
                class="button-court"
                v-bind="attrs"
                v-on:click="openDialog(item)"
                style="height: 80%;  border-radius: 10px;  color: white; font-size: 15px; "
              >
                <div style="padding-top: 10px;">
                  <p>{{ item.court_name }}</p>
                  <p
                    :style="{ color: item.court_status.status_id === 1 ? '#000000' : 'white', fontSize: '23px' }"
                  >{{ item.court_status.status_name }}</p>
                </div>
              </v-btn>
            </td>
          </tr>
          <tr class="tr-body">
            <td v-for="(item, index) in desserts.slice(8, 12)" :key="index">
              <v-btn
                depressed
                color="#8b47fa"
                class="button-court"
                v-bind="attrs"
                v-on:click="openDialog(item)"
                style="height: 80%;  border-radius: 10px;  color: white; font-size: 15px;"
              >
                <div style="padding-top: 10px;">
                  <p>{{ item.court_name }}</p>
                  <p
                    :style="{ color: item.court_status.status_id === 1 ? '#000000' : 'white', fontSize: '23px' }"
                  >{{ item.court_status.status_name }}</p>
                </div>
              </v-btn>
            </td>
          </tr>
          <tr class="tr-body">
            <td v-for="(item, index) in desserts.slice(12, 16)" :key="index">
              <v-btn
                depressed
                color="#8b47fa"
                class="button-court"
                v-bind="attrs"
                v-on:click="openDialog(item)"
                style="height: 80%;  border-radius: 10px;  color: white; font-size: 15px; "
              >
                <div style="padding-top: 10px;">
                  <p>{{ item.court_name }}</p>
                  <p
                    :style="{ color: item.court_status.status_id === 1 ? '#000000' : 'white', fontSize: '23px' }"
                  >{{ item.court_status.status_name }}</p>
                </div>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>



  <v-dialog v-model="dialogVisible" max-width="400">
    <template>
      <v-card>
        <div
          style="  display: flex;
        flex-direction: column;
  align-items: center; padding-top: 20px;"
        >
          <h3 style=" padding-bottom: 15px; font-size: 30px;">ยืนยันการจอง</h3>
          <div style="display: flex;
        flex-direction: column;
  align-items: left;">
            <p>สนาม : {{ selectedItem ? selectedItem.court_name : '' }}</p>
            <p>วันที่ : {{ currentDate }}</p>
            <p>เวลา : {{ selectedItem ? selectedItem.court_time : '' }}</p>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            @click="ConfirmReserve"
            style=" border-radius: 15px;
    border: 2px solid #8B47FA;  background-color: #8B47FA"
          >
            <span style="color: white;">ยืนยัน</span>
          </v-btn>
          <v-btn
            depressed
            style="border-radius: 15px;
    border: 2px solid #8B47FA;"
            @click="dialogVisible = false"
          >
            <span style="color: #8B47FA ;">ยกเลิก</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>


</div>
</template>

<script>
import AppbarCust from "../components/AppbarCust.vue";
import Swal from 'sweetalert2';
import axios from "axios";
export default {
  name: "Court",
  components: {
    AppbarCust
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString("th-TH"),
      desserts: [],
      dialogVisible: false,
      selectedItem: null
    };
  },
  mounted() {
    this.getCourtData();
  },

  methods: {
    getCourtData() {
      axios
        .get("http://localhost:9000/court")
        .then(response => {
          this.desserts = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },

    ConfirmReserve() {
      if (this.selectedItem) {
        this.selectedItem.court_status.status_id = 1;
        this.addReserve();
        this.updateCourtStatus();
        this.dialogVisible = false;
        
      }
    },

    async addReserve() {
      const user_id = JSON.parse(localStorage.getItem("dataUser")).user_id;
      const reserveItem = {
        date: new Date() ,
        court: { court_id: this.selectedItem.court_id },
        customer: { user_id: user_id }
      };
      axios
        .post(`http://localhost:9000/reserve`, reserveItem)
        .then(response => {
          console.log(reserveItem);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
        Swal.fire({
            title: 'ได้ทำการจองเสร็จสิ้น!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        
      });
       
    },
    async updateCourtStatus() {
      const court_id = this.selectedItem.court_id;
      const updatedItem = {
        court_id: this.selectedItem.court_id,
        court_name: this.selectedItem.court_name,
        court_status: {
          status_id: this.selectedItem.court_status.status_id,
          status_name: this.selectedItem.court_status.status_name
        }
      };
      axios
        .put(`http://localhost:9000/court/${court_id}`, updatedItem)
        .then(response => {
          console.log(response.data);
          // window.location.reload();
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
        
    },

    generateCourtName(courtName, index) {
      return `${courtName}_${index}`;
    },
    openDialog(item) {
     
      if (item.court_status.status_id === 1) {
        Swal.fire({
            title: 'สนามนี้ถูกจองแล้ว!',
            icon: 'error',
            timer: 1200,
            showConfirmButton: false
        
      });
    } else {
      this.selectedItem = item;
      this.dialogVisible = true;
    }
    }
  }
};
</script>

<style scoped>
.text-table {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  color: rgb(110, 109, 109);
}

.table-reserve {
  height: 550px;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 40px;
}
.button-court {
  width: 100%; /* Change the width to your preferred size */
  display: flex;
}
.tr-body {
  height: 120px;
}
</style>