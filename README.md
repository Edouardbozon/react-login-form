## Login component

Instanciate the component

```
const handleSubmit = (e, data) => {
    return axios.post('my-login-url.com/login', { data });
};

<Login title="Login page" handleSubmit={handleSubmit} />,
```

Props title and login are required.