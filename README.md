TODO.

### .env.local

```
NEXT_PUBLIC_API_URL=http://dev.talebound.net:8080
RECAPTCHA_SITE_KEY=6LeiWPElAAAAABi2SZ106XytyrE8oo3caX8HPwOh
```

### hosts file

Because of CORS policies, we need to make requests from this domain:

_open with admin privileges, usually here_ `C:\Windows\System32\drivers\etc`

```
#Talebound
127.0.0.1 dev.talebound.net
```