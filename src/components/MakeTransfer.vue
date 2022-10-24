<template>
  <div v-if="currentUserID" class="edit-form">
    <h4>Make transaction</h4>
    <form>
      <div class="form-group">
        <label for="receiver">Send money to:</label>
        <select id="receiver" class="form-control" v-model="transactionDetails.receiverID" name="receiver">
          <option v-for="user in users" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number" class="form-control" id="amount" required v-model="transactionDetails.amount" name="amount"
          min=0 />
      </div>
    </form>

    <button type="submit" class="btn btn-sm btn-success" @click="createTransaction">
      Make Transaction
    </button>
    <p>{{ message }}</p>
    <router-link to="/users" class="btn btn-sm btn-warning">Go back to Users</router-link>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import TransactionDataService from "../services/TransactionDataService";

export default {
  name: "make-transfer",
  data() {
    return {
      currentUserID: null,
      message: '',
      users: [],
      transactionDetails: {
        receiverID: null,
        amount: null
      },
      submitted: false
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    createTransaction() {
      var data = {
        sender: this.currentUserID,
        receiver: this.transactionDetails.receiverID,
        amount: this.transactionDetails.amount
      };
      TransactionDataService.create(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
          this.message = "Transaction Successful";
        })
        .catch(e => {
          console.log(e);
          this.message = e;
        });
    }
  },
  mounted() {
    this.message = '';
    this.currentUserID = this.$route.params.id;
    this.retrieveUsers();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>