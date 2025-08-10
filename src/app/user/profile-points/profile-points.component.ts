import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import moment from 'jalali-moment';

interface Score {
  title: string;
  points: number;
  date: string;
  description?: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-profile-points',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-points.component.html',
  styleUrls: ['./profile-points.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProfilePointsComponent implements OnInit {
  scores: Score[] = [
    { title: 'سفارش ویژه', points: 50, date: '2025-07-20', description: 'امتیاز برای سفارش بالای 200,000 تومان', showDetails: false },
    { title: 'امتیاز خوش‌آمدگویی', points: 30, date: '2025-07-15', description: 'امتیاز ثبت‌نام اولیه', showDetails: false }
  ];
  sortOption: string = 'date-desc';
  totalPoints: number = 0;
  rewardStatus: string = 'فعال';
  isRedeeming: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      this.scores = JSON.parse(savedScores);
    }
    this.calculateTotalPoints();
    this.updateRewardStatus();
    this.sortScores();
  }

  formatJalaliDate(date: string): string {
    return moment(date, 'YYYY-MM-DD').locale('fa').format('D MMMM YYYY');
  }

  sortScores() {
    this.scores.sort((a, b) => {
      if (this.sortOption === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (this.sortOption === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (this.sortOption === 'points-desc') {
        return b.points - a.points;
      } else {
        return a.points - b.points;
      }
    });
  }

  calculateTotalPoints() {
    this.totalPoints = this.scores.reduce((sum, score) => sum + score.points, 0);
  }

  updateRewardStatus() {
    if (this.totalPoints >= 200) {
      this.rewardStatus = 'VIP';
    } else if (this.totalPoints >= 100) {
      this.rewardStatus = 'طلایی';
    } else if (this.totalPoints > 0) {
      this.rewardStatus = 'فعال';
    } else {
      this.rewardStatus = 'غیرفعال';
    }
  }

  redeemPoints() {
    if (this.totalPoints < 100) {
      alert('برای دریافت تخفیف حداقل 100 امتیاز نیاز است.');
      return;
    }
    this.isRedeeming = true;
    setTimeout(() => {
      alert(`شما ${this.totalPoints} امتیاز را برای یک کد تخفیف استفاده کردید!`);
      this.scores = [];
      localStorage.setItem('scores', JSON.stringify(this.scores));
      this.calculateTotalPoints();
      this.updateRewardStatus();
      this.isRedeeming = false;
    }, 1000);
  }

  toggleDetails(index: number) {
    this.scores[index].showDetails = !this.scores[index].showDetails;
  }

}