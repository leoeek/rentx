import request from "supertest";
import { app } from "@shared/infra/http/app";
import { Connection, createConnection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("List category controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) 
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`
        );

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { refresh_token } = await responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        const response = await request(app).get("/categories").set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toEqual("Category Supertest");
    });

})