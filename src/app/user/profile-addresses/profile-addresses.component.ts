import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-addresses.component.html',
  styleUrls: ['./profile-addresses.component.css']
})
export class ProfileAddressesComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  newAddress = { name: '', details: '', postalCode: '', lat: 35.6892, lng: 51.3890 }; // مختصات پیش‌فرض: تهران
  addresses: any[] = [];

  ngOnInit() {
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      this.addresses = JSON.parse(savedAddresses);
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    try {
      this.map = L.map('map').setView([this.newAddress.lat, this.newAddress.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.marker = L.marker([this.newAddress.lat, this.newAddress.lng], {
        draggable: true
      }).addTo(this.map);

      this.marker.on('dragend', () => {
        const position = this.marker!.getLatLng();
        this.newAddress.lat = position.lat;
        this.newAddress.lng = position.lng;
      });

      this.map.on('click', (e: L.LeafletMouseEvent) => {
        this.newAddress.lat = e.latlng.lat;
        this.newAddress.lng = e.latlng.lng;
        this.marker!.setLatLng([this.newAddress.lat, this.newAddress.lng]);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  addAddress() {
    if (this.newAddress.name && this.newAddress.details && this.newAddress.postalCode) {
      this.addresses.push({ ...this.newAddress });
      localStorage.setItem('addresses', JSON.stringify(this.addresses));
      this.newAddress = { name: '', details: '', postalCode: '', lat: 35.6892, lng: 51.3890 };
      this.marker?.setLatLng([this.newAddress.lat, this.newAddress.lng]);
      this.map?.setView([this.newAddress.lat, this.newAddress.lng], 13);
    } else {
      alert('لطفاً تمام فیلدها را پر کنید.');
    }
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
  }
}