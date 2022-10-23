import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions/");
  }

  create(data) {
    return http.post("/transactions/", data);
  }

}

export default new TransactionDataService();