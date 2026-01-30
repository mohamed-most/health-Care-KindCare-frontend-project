import { Component, signal, OnInit } from '@angular/core';
import { ApiService } from '../api-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [NgClass],
  standalone: true,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq implements OnInit {
  constructor(private apiService: ApiService) {}

  faqs = signal<any[]>([]);
  // Store the ID of the currently expanded FAQ
  expandedId = signal<number | null>(null);

  ngOnInit() {
    this.apiService.getAllFaq().subscribe({
      next: (response) => this.faqs.set(response.data),
      error: (err) => console.error('Fetch error:', err),
    });
  }

  toggle(id: number) {
    // If clicking the same one, close it (set to null). Otherwise, open the new ID.
    this.expandedId.update((currentId) => (currentId === id ? null : id));
  }
}
