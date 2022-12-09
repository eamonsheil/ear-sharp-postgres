// import { DataTypes, Sequelize } from 'sequelize';


// module.exports = (sequelize: Sequelize) => {
//     sequelize.define('user', {

//         id: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: DataTypes.INTEGER
//         },
//         name: {
//             allowNull: false,
//             type: DataTypes.STRING
//         },
//         email: {
//             allowNull: false,
//             type: DataTypes.STRING,
//             unique: true
//         },
//         password: {
//             allowNull: false,
//             type: DataTypes.STRING
//         },
//     })
// }

export interface CreateUserDto {
    id: string;
    email: string;
    password: string;
    name: string;
    createdOn: string;
    lastLogin: number;
}

export interface UpdateUserDto {
    id: string;
    email?: string;
    password?: string;
    name?: string;
    createdOn?: string;
    lastLogin?: number;
}


const User = {
    id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: 'string',
        notNull: true
    },
    email: {
        type: 'string',
        notNull: true,
        unique: true
    },
    password: {
        type: 'string',
        notNull: true
    },
    createdOn: {
        type: 'date',
        notNull: true
    },
    lastLogin: {
        type: 'date'
    }
};