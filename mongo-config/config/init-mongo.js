db.createUser(
    {
        user: "adminuser",
        pwd: "adminpassword",
        roles: [
            {
                role: "readWrite",
                db: "databasetocreate"
            }
        ]
    }
);
