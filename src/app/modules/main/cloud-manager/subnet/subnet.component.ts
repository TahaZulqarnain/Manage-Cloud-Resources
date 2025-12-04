import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subnet',
  standalone: false,
  templateUrl: './subnet.component.html',
  styleUrl: './subnet.component.scss'
})
export class SubnetComponent {
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Output() remove = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Ensure form arrays exist
    if (!this.group.get('tags')) {
      this.group.addControl('tags', this.fb.array([]));
    }
    if (!this.group.get('nics')) {
      this.group.addControl('nics', this.fb.array([]));
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

  get nics(): FormArray {
    const nics = this.group.get('nics');
    if (!nics) {
      this.group.addControl('nics', this.fb.array([]));
    }
    return this.group.get('nics') as FormArray;
  }

  addNIC() {
    this.nics.push(
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        type: ['NIC', Validators.required],
        tags: this.fb.array([])
      })
    );
  }
  removeNIC(index: number) {
    this.nics.removeAt(index);
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

  get nicCount(): number {
    return this.nics.length;
  }
}

