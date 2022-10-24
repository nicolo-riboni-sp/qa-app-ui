<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <div class="col-md-6">
      <h4 id="title">Users List</h4>
      <ul class="list-group" id="userList">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(user, index) in users"
          :key="index" @click="setActiveUser(user, index)" :id="'user-'+user.id">
          {{ user.name }}: {{ user.balance.toFixed(2) }}€
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User</h4>
        <div>
          <label><strong>Name:</strong></label> <span id="name">{{ currentUser.name }}</span>
        </div>
        <div>
          <label><strong>Balance:</strong></label> <span id="balance">{{ currentUser.balance.toFixed(2) }}€</span>
        </div>

        <router-link :to="'/users/' + currentUser.id" class="btn btn-sm btn-info" id="addBalance">Add Balance
        </router-link>
        <router-link :to="'/transfer/' + currentUser.id" class="btn btn-sm btn-warning" id="makeTransaction">Make a
          transfer</router-link>

        <div v-if="transactions.length != 0" class="mt-5">
          <h5>{{ currentUser.name }}'s Transactions:</h5>
          <ul class="list-group" id="transactionList">
            <li class="list-group-item" v-for="(transaction) in transactions" :id="'transaction-' + transaction.id">
              From {{ users[transaction.sender - 1].name }} to {{ users[transaction.receiver - 1].name }} Amount: {{
    transaction.amount.toFixed(2)
              }}€
            </li>
          </ul>
        </div>
        <div v-else>
          <br />
          <p id="transactionMessage">There are currently no transactions available for the current user</p>
        </div>
      </div>
      <div v-else>
        <br />
        <p id="infoMessage">Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import TransactionDataService from "../services/TransactionDataService";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      transactions: [],
      currentUser: null,
      currentIndex: -1,
      name: ""
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

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
      this.transactions = [];
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
      TransactionDataService.getAll()
        .then(response => {
          this.transactions = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });;
    },
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>