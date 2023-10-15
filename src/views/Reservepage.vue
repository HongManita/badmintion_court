<template>
  <div>
    <AppbarCust />
    <div class="text-table">
      <h2>ผลการจองสนาม</h2>
    </div>

    <div class="table-reserve">
    <v-simple-table fixed-header height="600px">
      <template v-slot:default>
        <thead class="table-head">
          <tr>
            <th class="text-center" style="font-size: 15px">วันที่จอง</th>
            <th class="text-center" style="font-size: 15px">เวลาจอง</th>
            <th class="text-center" style="font-size: 15px">สนาม</th>
         
          </tr>
        </thead>
        <tbody>
  <tr v-for="(item, index) in desserts" :key="index">
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
import AppbarCust from "../components/AppbarCust.vue";
import axios from 'axios';

export default {
  name: "Reserve",
  components: {
    AppbarCust
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
      const user_id = JSON.parse(localStorage.getItem("dataUser")).user_id;
      await axios
        .get(`http://localhost:9000/reserves/user/${user_id}`,)
        .then(response => {
          this.desserts = response.data;
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },

    
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
</style>