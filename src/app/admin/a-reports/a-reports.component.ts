import { Component } from '@angular/core';

@Component({
  selector: 'app-a-reports',
  standalone: false,
  templateUrl: './a-reports.component.html',
  styleUrls: ['./a-reports.component.css']
})
export class AReportsComponent {
  newReport = { title: '', date: '', revenue: 0 };
  reports = [
    { title: 'فروش ماهانه', date: '1404/04/01', revenue: 5000 },
    { title: 'گزارش هفتگی', date: '1404/03/25', revenue: 2000 }
  ];
  editingIndex: number | null = null;
  editedReport = { title: '', date: '', revenue: 0 };
  showSuccess = false;
  searchTerm = '';

  constructor() {
    const savedReports = localStorage.getItem('reports');
    if (savedReports) this.reports = JSON.parse(savedReports);
  }

  addReport() {
    if (this.newReport.title && this.newReport.date && this.newReport.revenue >= 0) {
      this.reports.push({ ...this.newReport });
      this.saveReports();
      this.newReport = { title: '', date: '', revenue: 0 };
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000);
    }
  }

  editReport(index: number) {
    this.editingIndex = index;
    this.editedReport = { ...this.reports[index] };
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedReport.title && this.editedReport.date && this.editedReport.revenue >= 0) {
      this.reports[this.editingIndex] = { ...this.editedReport };
      this.saveReports();
      this.editingIndex = null;
      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 2000);
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteReport(index: number) {
    this.reports.splice(index, 1);
    this.saveReports();
    this.showSuccess = true;
    setTimeout(() => (this.showSuccess = false), 2000);
  }

  filterReports() {
    if (!this.searchTerm) return this.reports;
    return this.reports.filter(r =>
      r.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.date.includes(this.searchTerm)
    );
  }

  private saveReports() {
    localStorage.setItem('reports', JSON.stringify(this.reports));
  }
}