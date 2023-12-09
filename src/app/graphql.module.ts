import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';
import { baseUrl } from './environments/environment';
import { onError } from '@apollo/client/link/error';
import { MatSnackBarService } from './shared/service/mat-snack-bar.service';

const uri = `${baseUrl}/graphql`;
let localMatSnackbarService: MatSnackBarService;

const error = onError(() => {
  localMatSnackbarService.open('something went wrong');
});

export function createApollo(
  httpLink: HttpLink,
  matSnackBarService: MatSnackBarService,
): ApolloClientOptions<any> {
  localMatSnackbarService = matSnackBarService;
  return {
    link: error.concat(
      httpLink.create({
        uri: uri,
        withCredentials: true,
      }),
    ),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, MatSnackBarService],
    },
  ],
})
export class GraphQLModule {}
