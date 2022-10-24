<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required v-model="user.name" name="name" />
      </div>

      <div class="form-group">
        <label for="balance">Balance</label>
        <input type="number" class="form-control" id="balance" required v-model="user.balance" name="balance" min=0 />
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "create-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        balance: 0
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        balance: this.user.balance
      };

      UserDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>