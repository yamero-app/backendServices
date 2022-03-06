var authToken = "something";

module.exports = {
  checkAuth: function (authorization) {
    if (authorization == authToken) {
      return 1;
    } else {
      return 0;
    }
  },
};
