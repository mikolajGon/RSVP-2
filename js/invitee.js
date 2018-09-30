class Invitee {
  constructor(id, name, confirmed = false) {
    this.id = id;
    this.name = name;
    this.confirmed = confirmed;
  }

  changeConfirmedStatus() {
    this.confirmed = !this.confirmed;
  }
  changeName(newName) {
    this.name = newName;
  }
}
