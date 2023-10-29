import { Database } from "bun:sqlite";
import { user } from "../Models/User";

export class DataProvider {
    private db: Database;

    constructor() {
        this.db = new Database("src/Application.db");
    }

    close() {
        this.db.close()
    }

    //READERS
    getAllUsers() {
        const queryText = "select * from users;";
        const query = this.db.query(queryText);
        return query.all();
    }

    getUserByInfo(name: string) {
        const queryText = `select * from users where name='${name}';`;
        const query = this.db.query(queryText);
        return query.all()[0];
    }

    getUserByID(id: number) : any {
        const queryText = `select * from users where id='${id}';`;
        const query = this.db.query(queryText);
        return query.all()[0];
    }

    nameExists(name:string):boolean {
        const queryText = `select * from users where name='${name}';`;
        const query = this.db.query(queryText);
        return query.all().length != 0;
    }

    emailExists(email:string):boolean {
        const queryText = `select * from users where email='${email}';`;
        const query = this.db.query(queryText);
        return query.all().length != 0;
    }

    //NON-QUERY
    addUser(name: string, email: string, password: string, pfp:string) {
        const queryText = `insert into users values((select max(id)+1 from users), '${name}', '${email}', '${password}', '${pfp}');`;
        const query = this.db.query(queryText);
        query.run();
    }

    deleteUser(id: number) {
        const queryText = `delete from users where id=${id};`;
        const query = this.db.query(queryText);
        query.run();
    }
}