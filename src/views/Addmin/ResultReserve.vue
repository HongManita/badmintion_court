<template>
  <div>
    <AppbarAddmin />

    <div class="text-table">
      <h2>รายงานการจองสนาม</h2>
    </div>

    <div class="table-reserve">
    <v-simple-table fixed-header height="600px">
      <template v-slot:default>
        <thead class="table-head">
          <tr>
            <th class="text-center" style="font-size: 15px">รหัสผู้จอง</th>
            <th class="text-center" style="font-size: 15px">ชื่อผู้จอง</th>
            <th class="text-center" style="font-size: 15px">วันที่จอง</th>
            <th class="text-center" style="font-size: 15px">เวลาจอง</th>
            <th class="text-center" style="font-size: 15px">สนาม</th>
         
          </tr>
        </thead>
        <tbody>
  <tr v-for="(item, index) in desserts" :key="index">
    <td class="text-center">{{ item.customer.user_id }}</td>
    <td class="text-center">{{ item.customer.firstName }}</td>
    <td class="text-center">{{ item.date }}</td>
    <td class="text-center">{{ item.court.court_time}}</td>
    <td class="text-center">{{ item.court.court_name}}</td>
   
  </tr>

</tbody>
      
      </template>
    </v-simple-table>
  </div>

  </div>
</template>

<script>
import axios from "axios";
import AppbarAddmin from "../../components/AppbarAddmin.vue";
export default {
    name: "EditCourt",
  components: {
    AppbarAddmin
  },

  data() {
    return {
      desserts: [],
      selectedItem: null
    };
 
  },
  mounted() {
    this.getReserveData();
  },
  methods: {
    async getReserveData() {
    
      await axios
        .get(`http://localhost:9000/reserve`,)
        .then(response => {
          this.desserts = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },

    
  }

}
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
</style>