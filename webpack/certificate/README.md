## Certificates for local extension testing using WebpackDevServer

`localhost.pfx` password: `localhost`

## Generation
First: 
```
# openssl req -x509 -newkey rsa:4096 -sha256 -keyout localhost.key -out localhost.crt -days 968 -config localhost.conf
```
Second:
```
# openssl pkcs12 -export -name “localhost” -out localhost.pfx -inkey localhost.key -in localhost.crt
```
