import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import {NgModule} from "@angular/core";
import { baseUrl } from './environments/environment';
import {onError} from "@apollo/client/link/error";
import {MatSnackBar} from "@angular/material/snack-bar";

const uri = `${baseUrl}/graphql`;
let localMatSnackbar: MatSnackBar;

const error = onError(() => {
  localMatSnackbar?.open("something went wrong", 'close', {
    duration: 3000,
  });
});
export function createApollo(httpLink: HttpLink, matSnackBar: MatSnackBar): ApolloClientOptions<any> {
  localMatSnackbar = matSnackBar;
  return {
    link: error.concat(httpLink.create({
      uri: uri,
      withCredentials: true
    })),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, MatSnackBar],
    },
  ],
})
export class GraphQLModule {}
