import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "./schema.docs.graphql",
    generates: {
        "src/github-api/graphqlTypes.ts": {
            plugins: ["typescript"]
        }
    }
};

export default config;
