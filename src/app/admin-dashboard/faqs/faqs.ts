import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../api-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-faqs',
  imports: [FormsModule],
  templateUrl: './faqs.html',
  styleUrl: './faqs.css',
})
export class Faqs {
  private apiService = inject(ApiService);

  faqs = signal<any[]>([]);
  newFaq = signal({ question: '', answer: '' });
  isLoading = signal(true);

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.apiService.getAllFaq().subscribe({
      next: (res: any) => {
        // Ensure we are setting the array from the .data property
        this.faqs.set(res.data || []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  addFaq() {
    const payload = this.newFaq();
    if (!payload.question || !payload.answer) return;

    this.apiService.addFaq(payload).subscribe({
      next: (res: any) => {
        if (res.statusCode !== 200) return;

        // Update the signal with the new item at the top
        this.faqs.update((all) => [res.data, ...all]);

        // Reset the form
        this.newFaq.set({ question: '', answer: '' });
      },
      error: (err) => console.error('Error adding FAQ:', err),
    });
  }

  deleteFaq(id: number) {
    this.apiService.deleteFaq(id).subscribe({
      next: () => {
        // Instantly remove from UI without refresh
        this.faqs.update((all) => all.filter((f) => f.id !== id));
      },
    });
  }
}
