# Gratitude Journal

A simple node application that uses postgres for its database.

The database is created using docker with the following command:\
(choose a password and email of your choice)
```bash
docker run -e POSTGRES_PASSWORD="postgres" -p 5432:5432 --name pg postgres
```
To setup `pgadmin` you can use the following:
```bash
docker run -e PGADMIN_DEFAULT_EMAIL="" -e PGADMIN_DEFAULT_PASSWORD="postgres" -p 5555:80 —-name pgadmin dpage/pgadmin4
```

To run the server with nodemon, use:
```bash
npm run dev
```

TODO:
- Update database model to be more useful
- Add integration tests