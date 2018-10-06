// import { OktaAuthService } from '@okta/okta-angular';
// import {ProductService} from '../../services/product.service';
//
// // ...
//
// export class HomeComponent {
//   public joggingData: any[] = [];
//   public currentJogging: any;
//   public isAuthenticated: boolean;
//
//   constructor(public oktaAuth: OktaAuthService, private productService: ProductService) {
//     // get authentication state for immediate use
//     this.oktaAuth.isAuthenticated().then(result => {
//       this.isAuthenticated = result;
//     });
//
//     // subscribe to authentication state changes
//     this.oktaAuth.$authenticationState.subscribe(
//       (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
//     );
//
//     productService.getCategoriesAndSubCategories().subscribe((data: any[]) => this.joggingData = data);
//     // this.currentJogging = this.setInitialValuesForJoggingData();
//   }
// }
