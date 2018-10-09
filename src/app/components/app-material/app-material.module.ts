import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material';
import { MatListModule } from '@angular/material';
@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatListModule
  ]
})

export class AppMaterialModule{}
