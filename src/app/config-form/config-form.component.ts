import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { Config } from '../config.interface';

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit {
  config: Config | null = null;
  configForm!: FormGroup;
  loading = false;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const configId = this.route.snapshot.paramMap.get('id');
    if (configId) {
      this.loadConfig(configId);
    }
  }

  loadConfig(configId: string): void {
    this.loading = true;
    this.configService.getConfigs().subscribe({
      next: (configs) => {
        this.config = configs.find(c => c.id === configId) || null;
        if (this.config) {
          this.buildForm();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.loading = false;
      }
    });
  }

  buildForm(): void {
    if (!this.config) return;

    const controls: any = {};
    this.config.parameters.forEach(param => {
      const validators = param.required ? [Validators.required] : [];
      controls[param.name] = [param.defaultValue ?? '', validators];
    });

    this.configForm = this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.config && this.configForm.valid) {
      this.submitting = true;
      this.configService.submitConfig(this.config.id, this.configForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/configs']);
            this.submitting = false;
          },
          error: (err) => {
            console.error('Erreur lors de la soumission', err);
            this.submitting = false;
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/configs']);
  }
}