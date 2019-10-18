import database from '../database/connectDB';

const createCommentary = async dataCommentary => {
    const { idAdmin, idSub, commentary } = dataCommentary;

    if (!commentaryIsValid(commentary)) {
        throw ("Valide  os campos e tente novamente.");
    }

    const insertComment = 'INSERT INTO Commentary (idAdmin, idSubs, commentary) VALUES (?, ?, ?)';
    await database.get(insertComment, [idAdmin, idSub, commentary]);
};

const commentaryIsValid = commentary => {
    if (!commentary) {
        return false;
    }
    return true;
};

module.exports = { createCommentary };