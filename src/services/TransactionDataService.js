import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions/");
  }

  getUserTransactions(userId) {
    return http.get(`/transactions/${userId}`);
  }

  create(data) {
    return http.post("/transactions/", data);
  }

}

export default new TransactionDataService();