
import { expect } from "chai";
import supertest from 'supertest';
import app from "../server.js";

describe("Example Route", () => {
    it('Should return "This is an example route"', async () => {
        const response = await supertest(app).get('/example');
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('This is the example route');
    });
});
