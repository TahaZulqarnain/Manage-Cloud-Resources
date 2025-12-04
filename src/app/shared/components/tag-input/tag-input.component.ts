import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TagInputComponent {
  @Input() tagsFormArray!: FormArray;
  @Input() showTitle: boolean = true;
  @Input() title: string = 'Tags';
  @Input() titleLevel: 'h4' | 'h5' | 'h6' = 'h4';

  constructor(private fb: FormBuilder) {}

  getTagGroup(index: number): FormGroup {
    return this.tagsFormArray.at(index) as FormGroup;
  }

  addTag() {
    if (this.tagsFormArray) {
      this.tagsFormArray.push(
        this.fb.group({
          key: ['', Validators.required],
          value: ['']
        })
      );
    }
  }

  removeTag(index: number) {
    if (this.tagsFormArray) {
      this.tagsFormArray.removeAt(index);
    }
  }
}
