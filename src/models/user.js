import AuditModel from "@/models/audit-model";

export default class User extends AuditModel{
    constructor(id, createdAt, updatedAt, isDeleted, firstName, lastName, identification, phoneNumber, email, password) {
        super(id, createdAt, updatedAt, isDeleted);
        this.firstName = firstName;
        this.lastName = lastName;
        this.identification = identification;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
}
