import { Component, computed, signal } from '@angular/core';
import { ApiService } from '../../api-service';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-specializations',
  imports: [FormsModule],
  templateUrl: './specializations.html',
  styleUrl: './specializations.css',
})
export class Specializations {
  private apiService = inject(ApiService);

  // State
  specs = signal<any[]>([]);
  searchQuery = signal('');
  isLoading = signal(true);

  // Filtered list based on search input
  filteredSpecs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.specs();
    // If your backend returns strings, use: s.toLowerCase().includes(query)
    // If it returns objects, use: s.name.toLowerCase().includes(query)
    return this.specs().filter((s) =>
      (typeof s === 'string' ? s : s.name).toLowerCase().includes(query),
    );
  });

  ngOnInit() {
    this.loadSpecs();
  }

  loadSpecs() {
    this.apiService.getSpecializations().subscribe({
      next: (res: any) => {
        // This handles both [ "ORTHO", "NEURO" ] or [ {name: "ORTHO"}, ... ]
        this.specs.set(res.data || []);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
