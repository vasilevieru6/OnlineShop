import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() {
  }
  output =
    [
      {
        'category': 'Totul pentru scoala',
        'subcategories': [
          {'name' : 'Ghiozdane ortopedice'},
          {'name' : 'Rucsacuri scolare'},
          {'name' : 'Rucasacuri mini'},
          {'name' : 'Genti de sport'},
          {'name' : 'Penare'}
        ]
      },
      {
        'category': 'Mobila pentru copii',
        'subcategories':
          [
            {'name' : 'Paturi tip transformer'},
            {'name' : 'Paturi tip standard'},
            {'name' : 'Paturi CHICCO'},
            {'name' : 'Accesorii pentru paturi'}
          ]
      },
      {
        'category' : 'dfs',
        'subcategories':[]
      }
    ];

  getCategories(){
    return this.output;
  }
}
