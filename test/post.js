const expect = require("chai").expect;
const request = require("supertest");


const app = require("../app");
const mongo_conn = require("../db");

describe("Post /notes"),() => {

    beforeEach((done) => {
        mongo_conn.connect().then(() => done()).catch((err)=> done(err))
    })

    afterEach((done)=>{
        mongo_conn.close().then(()=> done()).catch((err)=> done(err))
    })

    it("OK, creating a new note",(done) => {
        request(app).post("/notes").send({"name":"NOTE NAME","text" : "this is text"}).then((res)=> {

            const body = res.body;
            expect(body).to.contain.property("_id");
            expect(body).to.contain.property("name");
            expect(body).to.contain.property("text");
            done()
        })
    })


}
