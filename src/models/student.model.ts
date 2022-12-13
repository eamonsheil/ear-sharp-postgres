
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