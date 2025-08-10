import { Component } from '@angular/core';

@Component({
  selector: 'app-a-users',
  standalone: false,
  templateUrl: './a-users.component.html',
  styleUrls: ['./a-users.component.css']
})
export class AUsersComponent {
  newUser = { username: '', email: '', role: 'user' };
  users = [
    { username: 'ali123', email: 'ali@example.com', role: 'user' },
    { username: 'admin1', email: 'admin@example.com', role: 'admin' }
  ];
  editingIndex: number | null = null;
  editedUser = { username: '', email: '', role: 'user' };
  showSuccess = false;
  searchTerm = '';

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) this.users = JSON.parse(savedUsers);
  }

  addUser() {
    if (this.newUser.username && this.newUser.email) {
      this.users.push({ ...this.newUser });
      this.saveUsers();
      this.newUser = { username: '', email: '', role: 'user' };
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000);
    }
  }

  editUser(index: number) {
    this.editingIndex = index;
    this.editedUser = { ...this.users[index] };
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedUser.username && this.editedUser.email) {
      this.users[this.editingIndex] = { ...this.editedUser };
      this.saveUsers();
      this.editingIndex = null;
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000);
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 2000);
  }

  filterUsers() {
    if (!this.searchTerm) return this.users;
    return this.users.filter(u =>
      u.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}