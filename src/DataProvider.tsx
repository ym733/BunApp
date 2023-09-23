import { Database } from "bun:sqlite";

export class DataProvider {
    private db: Database;

    constructor() {
        this.db = new Database("src/Application.db");
    }

    close() {
        this.db.close()
    }

    //READERS
    getAllUsers(){
        const queryText = "select * from users;";
        const query = this.db.query(queryText);
        return query.all();
    }

    //NON-QUERY
    addUser(name : string, email : string, password : string){
        const queryText = `insert into users values((select max(id)+1 from users), '${name}', '${email}', '${password}');`;
        const query = this.db.query(queryText);
        query.run();
    }
}