import { faker } from "@faker-js/faker";

function generateRandomUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

export default generateRandomUser;