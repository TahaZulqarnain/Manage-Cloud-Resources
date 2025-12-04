import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nic',
  standalone: false,
  templateUrl: './nic.component.html',
  styleUrl: './nic.component.scss',
})
export class NicComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Output() remove = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Ensure form arrays exist
    if (!this.group.get('tags')) {
      this.group.addControl('tags', this.fb.array([]));
    }
    
    // Ensure form controls have validators
    if (!this.group.get('name')?.hasError('required')) {
      this.group.get('name')?.setValidators([Validators.required, Validators.minLength(1)]);
      this.group.get('name')?.updateValueAndValidity();
    }
    if (!this.group.get('type')?.hasError('required')) {
      this.group.get('type')?.setValidators([Validators.required]);
      this.group.get('type')?.updateValueAndValidity();
    }
  }

  get tags(): FormArray {
    const tags = this.group.get('tags');
    if (!tags) {
      this.group.addControl('tags', this.fb.array([]));
    }
    return this.group.get('tags') as FormArray;
  }

  onRemove() {
    this.remove.emit();
  }

  get isNameInvalid(): boolean {
    const nameControl = this.group.get('name');
    return !!(nameControl && nameControl.invalid && nameControl.touched);
  }
}
