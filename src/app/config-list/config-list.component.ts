import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { Config } from '../config.interface';

@Component({
  selector: 'app-config-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit {
  configs: Config[] = [];
  loading = false;

  constructor(private configService: ConfigService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.configService.getConfigs().subscribe({
      next: (configs) => {
        this.configs = configs;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  onConfigClick(config: Config) {
    this.router.navigate(['/config-form', config.id]);
  }
}