class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        let resultingObj = null;
        this.data.forEach(obj => {
            if (obj.id === id) {
                resultingObj = obj;
            }
        })
        return resultingObj;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let response = false;
        this.data.forEach(user => {
            if (user.id === id) {
                user.id = obj;
                response = true;
            }
        })
        return response;
    }

    delete(id) {
        let response = false;
        for (let Obj of this.data) {
            if (Obj.id == id) {
                this.data.splice(this.data.indexOf(Obj), 1)
                response = true;
            }
        }
        return response;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;