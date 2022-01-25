# Metaflix Backend on Fastly Compute@Edge

Metaflix API server is created using fastly compute@edge. It is using jsc8 driver to make API calls to GDN. It has different API endpoints like login/signup, list top movies and movies by genre, list top tv series and series by genre etc.

## Prerequisite

1. Create API token by following [Fastly API Token doc](https://docs.fastly.com/en/guides/using-api-tokens#creating-api-tokens). The generated token will be used to configure Fastly CLI. **Create Token with `Global API access` Scope**
2. To install and configure Fastly CLI follow [Fastly CLI Doc](https://developer.fastly.com/reference/cli/)
3. Create Fastly Compute@Edge service

    ```
    $ fastly service create --name="Metaflix Fastly Backend" --type=wasm
    SUCCESS: Created service AAAAAAAAAAA
    ```

4. Update `fastly.toml` file with service ID generated by the above command
5. Create Fastly Compute@Edge backend to connect to GDN
    ```
    $ fastly backend create --version=latest --name="gdn_url" --address="api-gdn.paas.macrometa.io" --port=443
    SUCCESS: Created backend gdn_url (service AAAAAAAAAAA version 1)
    ```
6. Create Fastly Dictionary and Dictionary items to store environment variables

    ```
    fastly dictionary create --version=latest --name="env"
    fastly dictionary list --version=latest

    # Replace `DICTIONARY_ID` with dictionary id from above command.
    fastly dictionary-item create --dictionary-id="DICTIONARY_ID" --key="backend_name" --value="gdn_url"
    fastly dictionary-item create --dictionary-id="DICTIONARY_ID" --key="gdn_api_key" --value="GDN_API_KEY"
    fastly dictionary-item create --dictionary-id="DICTIONARY_ID" --key="gdn_api_url" --value="https://api-gdn.paas.macrometa.io"
    ```

## How to Run and Publish on Fastly Compute@Edge

```
git clone git@github.com:Macrometacorp/demo-ott-app-fastly.git
cd demo-ott-app-fastly/api-server
npm install
npm run dev
npm run deploy
```

In the above deployment command, it will prompt you for a domain, you can either select Fastly generated domain or type your own. Once deployment is complete you will use that domain to access the service

## How to Run in local

```
git clone git@github.com:Macrometacorp/demo-ott-app-fastly.git
cd demo-ott-app-fastly/api-server
npm install
Remove bin folder
fastly compute serve
```