import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vnet',
  templateUrl: './vnet.component.html',
  styleUrl: './vnet.component.scss'
})
export class VnetComponent {
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Output() remove = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Ensure form arrays exist
    if (!this.group.get('tags')) {
      this.group.addControl('tags', this.fb.array([]));
    }
    if (!this.group.get('subnets')) {
      this.group.addControl('subnets', this.fb.array([]));
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

  get subnets(): FormArray {
    const subnets = this.group.get('subnets');
    if (!subnets) {
      this.group.addControl('subnets', this.fb.array([]));
    }
    return this.group.get('subnets') as FormArray;
  }

  addSubnet() {
    this.subnets.push(
      this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        type: ['Subnet', Validators.required],
        tags: this.fb.array([]),
        nics: this.fb.array([])
      })
    );
  }

  removeSubnet(index: number) {
    this.subnets.removeAt(index);
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

  get subnetCount(): number {
    return this.subnets.length;
  }

  get totalNicCount(): number {
    return this.subnets.controls.reduce((total, subnet) => {
      const nics = (subnet.get('nics') as FormArray);
      return total + (nics ? nics.length : 0);
    }, 0);
  }
}