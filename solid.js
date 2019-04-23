// Single responsibility
// A class should have only one reason to  hange
// Decomposition principle

// class UserSettings {
//     constructor(user) {
//         this.user = user;
//     }

//     changeSettings(settings) {
//         if(this.verifyCredentials()) {}
//     }

//     verifyCredentials() {}
// }

class UserAuth {
    constructor(user) {
        this.user  = user;
    }

    verifyCredentials() {}

    // other auth stuff
}

class UserSettings {
    constructor(user) {
        this.user = user;
        this.auth = new AuthUser(user);
    }

    changeSettings() {
        const isVerified = this.auth.verifyCredentials();

        if(isVerified) {}
    }
}

// Open-closed
// Softwaqre entities should be open for extension, but closed for modification
// Design system in case of adding new features not to modify old one
// Principle is about abstract classes

// class AjaxAdapter extends Adapter {
//     constructor() {
//         super();
//         this.name = 'ajaxAdapter';
//     }
// }

// class NodeAdapter extends Adapter {
//     constructor() {
//         super();
//         this.name = 'nodeAdapter';
//     }
// }

// class HttpRequest {
//     constructor(adapter) {
//         this.adapter = adapter;
//     }

//     fetch(url) {
//         if(this.adapter.name === 'ajaxAdapter') {
//             return makeAjaxCall()
//                 .then(res => {})
//                 .catch(e => {})
//         }
//         if(this.adapter.name === 'nodeAdapter') {
//             return makeNodeCall()
//                 .then(res => {})
//                 .catch(e => {})
//         }
//     }
// }

// const makeAjaxCall = () => {};
// const makeNodeCall = () => {};

class AjaxAdapter extends Adapter {
    constructor() {
        super();
        this.name = 'ajaxAdapter';
    }

    request(url) {}
}

class NodeAdapter extends Adapter {
    constructor() {
        super();
        this.name = 'nodeAdapter';
    }

    request(url) {}
}

class HttpRequest {
    constructor(adapter) {
        this.adapter = adapter;
    }

    fetch(url) {
        return this.adapter.request(url)
            .then(res => {})
            .catch(e => {})
    }
}

// Liskov substitution
// Objects in the program must be replaceable by instances of their subtypes without altering the  correctness of the program execution

// class Rectangle {
//     constructor() {
//         this.width = 0;
//         this.heigth = 0;
//     }

//     setColor(color) {}

//     setWidth(width) {}

//     setHeight(heigth) {}

//     render(area) {}

//     getArea() {
//         return this.width * this.height;
//     }
// }

// class Square extends Rectangle {
//     setWidth(width) {
//         this.width = width;
//     }

//     setHeight(height) {
//         this.heigth = width;
//     }
// }

// function renderLargeRectangles(rectangles) {
//     rectangles.map(rec => {
//         rec.setWidth(4);
//         rec.setHeight(5);

//         const area = rec.getArea(); // returns 25 for Square. Should be 20
        
//         rec.render(area);
//     });
// }

class Shape {
    setColor(color) {}

    render(area) {}
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }

    getArea() {
        return this.length ** 2;
    }
}

function renderLargeShapes(shapes) {
    shapes.map(shape => {
        const area = shape.getArea();
        shape.render(area);
    });
}

const shapes = [new Rectangle(4, 5), new Square(5)];

renderLargeShapes();

// Intefrace segragation
// Clients should not depend on methods that they do not use
// Very similar to single responsibility
// If you have big interface - spilit it

// Dependency inversion
// 1. The modules of the upper levels should not depend on the modules of the lower levels. Both types of modules must depend on abstractions
// 2. Abstractions should not depend on the details. Details must depend on abstractions

// 3. desing via interfaces
// 4. localize creating instances. No new, use factories

// class User{
//     constructor() {
//         this.settings = new UserSettings();
//     }
// }

// const user = new User();

class UserSettings {}

class User {
    constructor(settings) {
        this.settings = settings;
    }
}

const userSettings = new UserSettings();
const user = new User(userSettings);
