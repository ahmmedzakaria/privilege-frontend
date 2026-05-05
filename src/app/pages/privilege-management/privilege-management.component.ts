import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Privilege, PrivilegeFeatureDefinition, PrivilegeService, SubMenu } from '../../core/services/privilege.service';
import { TextboxComponent } from '@kyc/shared/components/textbox/textbox.component';
import { SmartDropdownComponent } from '@kyc/shared/components/smart-dropdown/smart-dropdown.component';
import { ButtonComponent } from '@kyc/shared/components/button/button.component';

@Component({
    selector: 'app-privilege-management',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TextboxComponent, SmartDropdownComponent, ButtonComponent],
    templateUrl: './privilege-management.component.html',
    styleUrls: ['./privilege-management.component.scss'],
})
export class PrivilegeManagementComponent implements OnInit {
    privilegeForm: FormGroup;
    menuForm: FormGroup;
    assignmentForm: FormGroup;
    checkForm: FormGroup;

    privileges: Privilege[] = [];
    subMenus: SubMenu[] = [];
    definitions: PrivilegeFeatureDefinition[] = [];
    selectedCodes = new Set<string>();
    searchText = '';
    loading = false;
    checkResult: { privilegeCode: string; allowed: boolean } | null = null;

    moduleOptions = [
        { label: 'KYC', value: '01' },
        { label: 'Auth', value: '02' },
        { label: 'GIS', value: '03' },
        { label: 'Services', value: '04' },
    ];

    featureTypeOptions = [
        { label: 'Setup', value: '01' },
        { label: 'Operations', value: '02' },
        { label: 'Report', value: '03' },
    ];

    actionOptions = [
        { label: 'Create', value: '01' },
        { label: 'Update', value: '02' },
        { label: 'Delete', value: '03' },
        { label: 'Reject', value: '04' },
        { label: 'Send Back', value: '05' },
        { label: 'View', value: '06' },
        { label: 'Approve', value: '07' },
        { label: 'Search', value: '08' },
    ];

    assignmentTargetOptions = [
        { label: 'Role', value: 'role' },
        { label: 'User', value: 'user' },
    ];

    constructor(
        private formBuilder: FormBuilder,
        private privilegeService: PrivilegeService
    ) {
        this.privilegeForm = this.formBuilder.group({
            moduleCode: ['01', Validators.required],
            featureTypeCode: ['02', Validators.required],
            featureCode: ['001', [Validators.required, Validators.pattern(/^\d{3}$/)]],
            featureName: ['Person', Validators.required],
            actionCode: ['01', Validators.required],
            subMenuId: [null],
            active: [true],
        });

        this.menuForm = this.formBuilder.group({
            id: [null],
            name: ['Person', Validators.required],
            url: ['/person', Validators.required],
            icon: ['fa fa-users'],
            moduleCode: ['01', Validators.required],
            featureTypeCode: ['02', Validators.required],
            featureCode: ['001', [Validators.required, Validators.pattern(/^\d{3}$/)]],
            featureName: ['Person', Validators.required],
            active: [true],
        });

        this.assignmentForm = this.formBuilder.group({
            targetType: ['role', Validators.required],
            targetId: ['', Validators.required],
        });

        this.checkForm = this.formBuilder.group({
            username: [''],
            privilegeCode: [''],
            moduleCode: ['01'],
            featureTypeCode: ['02'],
            featureCode: ['001', Validators.pattern(/^\d{3}$/)],
            actionCode: ['01'],
        });
    }

    ngOnInit(): void {
        this.loadDefinitions();
        this.loadSubMenus();
        this.loadPrivileges();
    }

    get generatedPrivilegeCode(): string {
        return this.buildPrivilegeCode(this.privilegeForm.value);
    }

    get checkPrivilegeCodePreview(): string {
        const privilegeCode = this.checkForm.value.privilegeCode;
        return privilegeCode || this.buildPrivilegeCode(this.checkForm.value);
    }

    get filteredPrivileges(): Privilege[] {
        const term = this.searchText.trim().toLowerCase();
        if (!term) {
            return this.privileges;
        }

        return this.privileges.filter(privilege =>
            [
                privilege.privilegeCode,
                privilege.moduleName,
                privilege.featureTypeName,
                privilege.featureName,
                privilege.actionName,
            ].some(value => (value || '').toLowerCase().includes(term))
        );
    }

    get subMenuOptions(): { label: string; value: number }[] {
        return this.subMenus
            .filter(menu => !!menu.id)
            .map(menu => ({
                label: `${menu.name} (${menu.url})`,
                value: menu.id as number,
            }));
    }

    loadPrivileges(): void {
        this.loading = true;
        this.privilegeService.listPrivileges().subscribe({
            next: privileges => {
                this.privileges = privileges || [];
                this.loading = false;
            },
            error: () => {
                this.privileges = [];
                this.loading = false;
            },
        });
    }

    loadDefinitions(): void {
        this.privilegeService.listDefinitions().subscribe({
            next: definitions => {
                this.definitions = definitions || [];
                this.applyDefinitionOptions();
            },
            error: () => {
                this.definitions = [];
            }
        });
    }

    loadSubMenus(): void {
        this.privilegeService.listSubMenus().subscribe({
            next: subMenus => {
                this.subMenus = subMenus || [];
            },
            error: () => {
                this.subMenus = [];
            }
        });
    }

    saveSubMenu(): void {
        if (this.menuForm.invalid) {
            this.menuForm.markAllAsTouched();
            return;
        }

        const formValue = this.menuForm.value;
        const moduleOption = this.moduleOptions.find(option => option.value === formValue.moduleCode);
        const featureTypeOption = this.featureTypeOptions.find(option => option.value === formValue.featureTypeCode);

        this.privilegeService.saveSubMenu({
            id: formValue.id,
            name: formValue.name,
            url: formValue.url,
            icon: formValue.icon,
            moduleCode: formValue.moduleCode,
            moduleName: moduleOption?.label || formValue.moduleCode,
            featureTypeCode: formValue.featureTypeCode,
            featureTypeName: featureTypeOption?.label || formValue.featureTypeCode,
            featureCode: formValue.featureCode,
            featureName: formValue.featureName,
            active: !!formValue.active,
        }).subscribe({
            next: menu => {
                this.menuForm.patchValue({ id: menu.id });
                this.loadSubMenus();
            },
        });
    }

    savePrivilege(): void {
        if (this.privilegeForm.invalid) {
            this.privilegeForm.markAllAsTouched();
            return;
        }

        const formValue = this.privilegeForm.value;
        const moduleOption = this.moduleOptions.find(option => option.value === formValue.moduleCode);
        const featureTypeOption = this.featureTypeOptions.find(option => option.value === formValue.featureTypeCode);
        const actionOption = this.actionOptions.find(option => option.value === formValue.actionCode);

        this.privilegeService.savePrivilege({
            moduleCode: formValue.moduleCode,
            moduleName: moduleOption?.label || formValue.moduleCode,
            featureTypeCode: formValue.featureTypeCode,
            featureTypeName: featureTypeOption?.label || formValue.featureTypeCode,
            featureCode: formValue.featureCode,
            featureName: formValue.featureName,
            actionCode: formValue.actionCode,
            actionName: actionOption?.label || formValue.actionCode,
            subMenuId: formValue.subMenuId || null,
            active: !!formValue.active,
        }).subscribe({
            next: () => this.loadPrivileges(),
        });
    }

    editPrivilege(privilege: Privilege): void {
        this.privilegeForm.patchValue({
            moduleCode: privilege.moduleCode,
            featureTypeCode: privilege.featureTypeCode,
            featureCode: privilege.featureCode,
            featureName: privilege.featureName,
            actionCode: privilege.actionCode,
            subMenuId: privilege.subMenuId || null,
            active: privilege.active,
        });
    }

    editSubMenu(menu: SubMenu): void {
        this.menuForm.patchValue(menu);
    }

    togglePrivilegeSelection(privilegeCode: string, checked: boolean): void {
        if (checked) {
            this.selectedCodes.add(privilegeCode);
        } else {
            this.selectedCodes.delete(privilegeCode);
        }
    }

    selectAllFiltered(): void {
        this.filteredPrivileges.forEach(privilege => this.selectedCodes.add(privilege.privilegeCode));
    }

    clearSelection(): void {
        this.selectedCodes.clear();
    }

    assignPrivileges(): void {
        if (this.assignmentForm.invalid || this.selectedCodes.size === 0) {
            this.assignmentForm.markAllAsTouched();
            return;
        }

        const targetId = Number(this.assignmentForm.value.targetId);
        const payload = {
            privilegeCodes: Array.from(this.selectedCodes),
            roleId: this.assignmentForm.value.targetType === 'role' ? targetId : null,
            userId: this.assignmentForm.value.targetType === 'user' ? targetId : null,
        };

        const request$ = this.assignmentForm.value.targetType === 'role'
            ? this.privilegeService.assignRolePrivileges(payload)
            : this.privilegeService.assignUserPrivileges(payload);

        request$.subscribe({
            next: () => this.clearSelection(),
        });
    }

    checkPrivilege(): void {
        if (this.checkForm.invalid) {
            this.checkForm.markAllAsTouched();
            return;
        }

        const formValue = this.checkForm.value;
        this.privilegeService.checkPrivilege({
            username: formValue.username || undefined,
            privilegeCode: formValue.privilegeCode || undefined,
            moduleCode: formValue.privilegeCode ? undefined : formValue.moduleCode,
            featureTypeCode: formValue.privilegeCode ? undefined : formValue.featureTypeCode,
            featureCode: formValue.privilegeCode ? undefined : formValue.featureCode,
            actionCode: formValue.privilegeCode ? undefined : formValue.actionCode,
        }).subscribe({
            next: result => {
                this.checkResult = {
                    privilegeCode: result.privilegeCode,
                    allowed: result.allowed,
                };
            },
        });
    }

    normalizeFeatureCode(): void {
        const value = String(this.privilegeForm.value.featureCode || '').replace(/\D/g, '').slice(0, 3);
        this.privilegeForm.patchValue({ featureCode: value.padStart(3, '0') }, { emitEvent: false });
    }

    private buildPrivilegeCode(value: any): string {
        const moduleCode = value.moduleCode || '';
        const featureTypeCode = value.featureTypeCode || '';
        const featureCode = value.featureCode || '';
        const actionCode = value.actionCode || '';
        return `${moduleCode}${featureTypeCode}${featureCode}${actionCode}`;
    }

    private applyDefinitionOptions(): void {
        if (!this.definitions.length) {
            return;
        }

        this.moduleOptions = this.uniqueOptions(
            this.definitions.map(definition => ({
                label: definition.moduleName,
                value: definition.moduleCode,
            }))
        );

        this.featureTypeOptions = this.uniqueOptions(
            this.definitions.map(definition => ({
                label: definition.featureTypeName,
                value: definition.featureTypeCode,
            }))
        );

        this.actionOptions = this.uniqueOptions(
            this.definitions.flatMap(definition => definition.actions.map(action => ({
                label: action.actionName,
                value: action.actionCode,
            })))
        );

        const firstDefinition = this.definitions[0];
        const firstAction = firstDefinition.actions[0];
        this.privilegeForm.patchValue({
            moduleCode: firstDefinition.moduleCode,
            featureTypeCode: firstDefinition.featureTypeCode,
            featureCode: firstDefinition.featureCode,
            featureName: firstDefinition.featureName,
            actionCode: firstAction?.actionCode || this.privilegeForm.value.actionCode,
        });
        this.menuForm.patchValue({
            name: firstDefinition.menuLabel || firstDefinition.featureName,
            moduleCode: firstDefinition.moduleCode,
            featureTypeCode: firstDefinition.featureTypeCode,
            featureCode: firstDefinition.featureCode,
            featureName: firstDefinition.featureName,
            icon: firstDefinition.icon || this.menuForm.value.icon,
        });
    }

    private uniqueOptions(options: { label: string; value: any }[]): { label: string; value: any }[] {
        const seen = new Set<string>();
        return options.filter(option => {
            if (seen.has(option.value)) {
                return false;
            }
            seen.add(option.value);
            return true;
        });
    }
}
