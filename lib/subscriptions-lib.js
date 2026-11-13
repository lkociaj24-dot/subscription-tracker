// subscriptions-lib.js: my own small JavaScript library
const SubLib = {
  KEY: "subscriptions",

  load() {
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  },

  save(list) {
    localStorage.setItem(this.KEY, JSON.stringify(list));
  },

  add(sub) {
    const list = this.load();
    list.push(sub);
    this.save(list);
  },

  remove(id) {
    this.save(this.load().filter(s => s.id !== id));
  },

  isExpired(sub) {
    const today = new Date().toISOString().slice(0, 10);
    return sub.renewal < today;
  },

  getStatus(sub) {
    return this.isExpired(sub) ? "Expired" : "Active";
  },

  countExpired() {
    return this.load().filter(s => this.isExpired(s)).length;
  }
};