export const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_on TIMESTAMP NOT NULL DEFAULT current_timestamp,
            last_login TIMESTAMP NOT NULL DEFAULT current_timestamp
        );
    `

export const createChordScoresTable = `
        CREATE TABLE IF NOT EXISTS chord_scores (
            total_attempts INT DEFAULT 0,
            num_correct INT DEFAULT 0,
            num_incorrect INT DEFAULT 0,
            current_streak INT DEFAULT 0,
            user_id INT REFERENCES users(id)
        );
    `

export const createPitchScoresTable = `
        CREATE TABLE IF NOT EXISTS pitch_scores (
            total_attempts INT DEFAULT 0,
            num_correct INT DEFAULT 0,
            num_incorrect INT DEFAULT 0,
            current_streak INT DEFAULT 0,
            user_id INT REFERENCES users (id)
        );
    `


export const createChordsTable = `
        CREATE TABLE IF NOT EXISTS chords (
            id serial PRIMARY KEY,
            quality VARCHAR(255) NOT NULL,
            root_position INTEGER[] NOT NULL,
            first_inversion INTEGER[] DEFAULT NULL,
            second_inversion INTEGER[] DEFAULT NULL,
            third_inversion INTEGER[] DEFAULT NULL
        );
    `

export const seedChordsTable = `
        INSERT INTO chords (quality, root_position, first_inversion, second_inversion)
        VALUES ('major', ARRAY [0,4,7], ARRAY [0,3,8], ARRAY [0,5,9]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion)
        VALUES ('minor', ARRAY [0,3,7], ARRAY [0,4,9], ARRAY [0,5,8]);

        INSERT INTO chords (quality, root_position)
        VALUES ('augmented', ARRAY [0,4,8]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion)
        VALUES ('diminished_triad', ARRAY [0,3,6], ARRAY [0,3,9], ARRAY [0,6,9]);

        INSERT INTO chords (quality, root_position)
        VALUES ('diminished', ARRAY [0,3,6,9]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion, third_inversion)
        VALUES ('major_7th', ARRAY [0,4,7,11], ARRAY [0,3,7,8], ARRAY [0,4,5,9], ARRAY [0,1,5,8]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion, third_inversion)
        VALUES ('dominant_7th', ARRAY [0,4,7,10], ARRAY [0,3,6,8], ARRAY [0,3,5,9], ARRAY [0,2,6,9]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion, third_inversion)
        VALUES ('minor_7th', ARRAY [0,3,7,10], ARRAY [0,4,7,9], ARRAY [0,3,5,8], ARRAY [0,2,5,9]);

        INSERT INTO chords (quality, root_position, first_inversion, second_inversion, third_inversion)
        VALUES ('half_diminished', ARRAY [0,3,6,10], ARRAY [0,3,7,9], ARRAY [0,4,6,9], ARRAY [0,2,5,8]);
    `



    // INSERT INTO pitch_scores (student_id)
    //         VALUES (new_student_id)
    //         RETURNING total_attempts, num_correct,
    //         num_incorrect, current_streak
    //         INTO pitch_total_attempts, pitch_num_correct,
    //         pitch_num_incorrect, pitch_current_streak