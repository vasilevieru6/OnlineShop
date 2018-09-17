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
    MatAutocompleteModule

  ]
})

export class AppMaterialModule{}
