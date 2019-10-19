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
    if (!commentary || typeof (commentary) !== "string") {
        return false;
    }
    return true;
};

const commentaryExistsByIdSubs = async idSubs => {

    if (!idSubs || idSubs <= 0) {
        return false;
    }
    const searchById = 'SELECT idSubs FROM Commentary WHERE idSubs = ?';
    const subs = await database.all(searchById, [idSubs]);

    if (subs.length == 0) {
        return false;
    }
    return true;
};

const getCommentaryByIdSubs = async idSubs => {
    const commentaryChecked = await commentaryExistsByIdSubs(idSubs);

    if (commentaryChecked) {
        const searchByIdSubs = 'SELECT commentary FROM Commentary WHERE idSubs = ?';
        const idSubsChecked = await database.all(searchByIdSubs, [idSubs]);

        return idSubsChecked;
    }
};

module.exports = { createCommentary, getCommentaryByIdSubs };