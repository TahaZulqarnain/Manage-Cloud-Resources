import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VNet } from '../../../core/interfaces/cloud-resource.interface';
import { Network, Data, Options } from 'vis-network';
import { DataSet } from 'vis-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cloud-manager',
  standalone: false,
  templateUrl: './cloud-manager.component.html',
  styleUrl: './cloud-manager.component.scss'
})
export class CloudManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('networkContainer', { static: false }) networkContainer!: ElementRef;

  form!: FormGroup;
  network!: Network;
  private networkData: { nodes: any[], edges: any[] } = { nodes: [], edges: [] };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vnets: this.fb.array([])
    });

    this.loadJSON();
    
    // Subscribe to form changes to update visualization
    this.form.valueChanges.subscribe(() => {
      this.updateVisualization();
    });
  }

  ngAfterViewInit(): void {
    this.initializeNetwork();
  }

  ngOnDestroy(): void {
    if (this.network) {
      this.network.destroy();
    }
  }

  get vnets(): FormArray {
    return this.form.get('vnets') as FormArray;
  }

  addVNet() {
    const vnetGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      type: ['VNet', Validators.required],
      tags: this.fb.array([]),
      subnets: this.fb.array([])
    });

    this.vnets.push(vnetGroup);
    this.updateVisualization();
  }

  removeVNet(index: number) {
    this.vnets.removeAt(index);
    this.updateVisualization();
  }

  loadJSON() {
    this.http.get<any>('/assets/initial-data.json').subscribe({
      next: (data) => {
        if (data && data.vnets) {
          data.vnets.forEach((v: VNet) => {
            const vnetGroup = this.fb.group({
              name: [v.name || '', [Validators.required, Validators.minLength(1)]],
              type: [v.type || 'VNet', Validators.required],
              tags: this.fb.array((v.tags || []).map(t => this.fb.group({
                key: [t.key || '', Validators.required],
                value: [t.value || '']
              }))),
              subnets: this.fb.array([])
            });

            const subnetsArray = vnetGroup.get('subnets') as FormArray;
            (v.subnets || []).forEach((s: any) => {
              const subnetGroup = this.fb.group({
                name: [s.name || '', [Validators.required, Validators.minLength(1)]],
                type: [s.type || 'Subnet', Validators.required],
                tags: this.fb.array((s.tags || []).map((t: any) => this.fb.group({
                  key: [t.key || '', Validators.required],
                  value: [t.value || '']
                }))),
                nics: this.fb.array([])
              });

              const nicsArray = subnetGroup.get('nics') as FormArray;
              (s.nics || []).forEach((n: any) => {
                nicsArray.push(this.fb.group({
                  name: [n.name || '', [Validators.required, Validators.minLength(1)]],
                  type: [n.type || 'NIC', Validators.required],
                  tags: this.fb.array((n.tags || []).map((t: any) => this.fb.group({
                    key: [t.key || '', Validators.required],
                    value: [t.value || '']
                  })))
                }));
              });

              subnetsArray.push(subnetGroup);
            });

            this.vnets.push(vnetGroup);
          });
        }
        this.updateVisualization();
      },
      error: () => {
        // Fallback to default data if file doesn't exist
        this.loadDefaultData();
      }
    });
  }

  loadDefaultData() {
    const defaultData = {
      vnets: [
        {
          name: 'VNet 1',
          type: 'VNet',
          tags: [{ key: 'env', value: 'dev' }],
          subnets: [
            {
              name: 'Subnet 1',
              type: 'Subnet',
              tags: [],
              nics: [
                { name: 'NIC 1', type: 'NIC', tags: [] },
                { name: 'NIC 2', type: 'NIC', tags: [] }
              ]
            },
            {
              name: 'Subnet 2',
              type: 'Subnet',
              tags: [],
              nics: [
                { name: 'NIC 2-1', type: 'NIC', tags: [] },
                { name: 'NIC 2-2', type: 'NIC', tags: [] },
                { name: 'NIC 2-3', type: 'NIC', tags: [] }
              ]
            }
          ]
        }
      ]
    };

    defaultData.vnets.forEach((v: any) => {
      const vnetGroup = this.fb.group({
        name: [v.name, [Validators.required, Validators.minLength(1)]],
        type: [v.type, Validators.required],
        tags: this.fb.array(v.tags.map((t: any) => this.fb.group({
          key: [t.key, Validators.required],
          value: [t.value]
        }))),
        subnets: this.fb.array([])
      });

      const subnetsArray = vnetGroup.get('subnets') as FormArray;
      v.subnets.forEach((s: any) => {
        const subnetGroup = this.fb.group({
          name: [s.name, [Validators.required, Validators.minLength(1)]],
          type: [s.type, Validators.required],
          tags: this.fb.array(s.tags.map((t: any) => this.fb.group({
            key: [t.key, Validators.required],
            value: [t.value]
          }))),
          nics: this.fb.array([])
        });

        const nicsArray = subnetGroup.get('nics') as FormArray;
        s.nics.forEach((n: any) => {
          nicsArray.push(this.fb.group({
            name: [n.name, [Validators.required, Validators.minLength(1)]],
            type: [n.type, Validators.required],
            tags: this.fb.array(n.tags.map((t: any) => this.fb.group({
              key: [t.key, Validators.required],
              value: [t.value]
            })))
          }));
        });

        subnetsArray.push(subnetGroup);
      });

      this.vnets.push(vnetGroup);
    });
    this.updateVisualization();
  }

  initializeNetwork() {
    if (!this.networkContainer) return;

    const nodes: any[] = [];
    const edges: any[] = [];

    this.networkData = { nodes, edges };

    const data: Data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };

    const options: Options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          levelSeparation: 150,
          nodeSpacing: 200,
          treeSpacing: 200
        }
      },
      nodes: {
        shape: 'box',
        font: {
          size: 14,
          face: 'Arial'
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 0.5 }
        },
      },
      physics: {
        enabled: false
      },
      interaction: {
        dragNodes: true,
        zoomView: true,
        dragView: true
      }
    };

    this.network = new Network(this.networkContainer.nativeElement, data, options);
  }

  updateVisualization() {
    if (!this.network || !this.networkContainer) return;

    const nodes: any[] = [];
    const edges: any[] = [];
    let nodeId = 0;

    const vnets = this.vnets.controls;
    vnets.forEach((vnetControl, vnetIndex) => {
      const vnetName = vnetControl.get('name')?.value || `VNet ${vnetIndex + 1}`;
      const vnetId = nodeId++;
      
      nodes.push({
        id: vnetId,
        label: vnetName,
        level: 0,
        color: { background: '#240d83', border: '#1a0a5c', highlight: { background: '#3d1fa3' } },
        font: { color: '#ffffff', size: 16, face: 'Arial', bold: true }
      });

      const subnets = (vnetControl.get('subnets') as FormArray).controls;
      subnets.forEach((subnetControl, subnetIndex) => {
        const subnetName = subnetControl.get('name')?.value || `Subnet ${subnetIndex + 1}`;
        const subnetId = nodeId++;
        
        nodes.push({
          id: subnetId,
          label: subnetName,
          level: 1,
          color: { background: '#3d1fa3', border: '#240d83', highlight: { background: '#5a3fc7' } },
          font: { color: '#ffffff', size: 14 }
        });

        edges.push({ from: vnetId, to: subnetId });

        const nics = (subnetControl.get('nics') as FormArray).controls;
        nics.forEach((nicControl, nicIndex) => {
          const nicName = nicControl.get('name')?.value || `NIC ${nicIndex + 1}`;
          const nicId = nodeId++;
          
          nodes.push({
            id: nicId,
            label: nicName,
            level: 2,
            color: { background: '#28a745', border: '#1e7e34', highlight: { background: '#34ce57' } },
            font: { color: '#ffffff', size: 12 }
          });

          edges.push({ from: subnetId, to: nicId });
        });
      });
    });

    this.networkData = { nodes, edges };
    this.network.setData({
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      alert('Form submitted successfully! Check console for data.');
    } else {
      this.markFormGroupTouched(this.form);
      alert('Please fill in all required fields.');
    }
  }

  exportJSON() {
    const dataStr = JSON.stringify(this.form.value, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cloud-resources.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    if (formGroup instanceof FormArray) {
      formGroup.controls.forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        }
      });
    } else if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control) {
          control.markAsTouched();

          if (control instanceof FormGroup || control instanceof FormArray) {
            this.markFormGroupTouched(control);
          }
        }
      });
    }
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }
}