import type { CodegenConfig } from '@graphql-codegen/cli'
import { baseUrl } from '../environments/environment';

const config: CodegenConfig = {
  schema: `${baseUrl}/graphql`,
  documents: './src/**/*.graphql',
  generates: {
    'src/app/graphql/__generated__.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true
      }
    }
    
    
  }
}
export default config;
