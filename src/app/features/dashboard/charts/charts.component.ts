import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  @Input() storeCharts;
  uniqueCategoryNames = new Set<string>();

  @ViewChild('polarAreaChart', { static: true }) chartCanvas: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createPolarAreaChart();
  }

  private createPolarAreaChart(): void {
    const ctx: CanvasRenderingContext2D =
      this.chartCanvas.nativeElement.getContext('2d');

    const categoriesData = this.calculateCategoriesData();

    const data = {
      labels: categoriesData.map((item) => item.category),
      datasets: [
        {
          data: categoriesData.map((item) => item.numberOfProducts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ],
          borderWidth: 2,
        },
      ],
    };

    const options = {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
    };

    new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options,
    });
  }

  private calculateCategoriesData(): any[] {
    const categoriesMap = new Map<string, number>();
    this.storeCharts.forEach((item) => {
      const categoryName = item.category.toLowerCase();
      categoriesMap.set(
        categoryName,
        (categoriesMap.get(categoryName) || 0) + item.numberOfProducts
      );
    });

    // Converte la mappa in un array di oggetti
    const categoriesData = Array.from(
      categoriesMap,
      ([category, numberOfProducts]) => ({ category, numberOfProducts })
    );

    return categoriesData;
  }
}
