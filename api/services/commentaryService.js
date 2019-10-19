import database from '../database/connectDB';
import { subscriptionExistsById } from '../services/subscriptionService'

const createCommentary = async dataCommentary => {
    const { idAdmin, idSubs, commentary } = dataCommentary;

    const commentaryValid = commentaryIsValid(commentary);
    if (!commentaryValid) {
        throw ("Valide  os campos e tente novamente.");
    }

    const insertComment = 'INSERT INTO Commentary (idAdmin, idSubs, commentary) VALUES (?, ?, ?)';
    await database.run(insertComment, [idAdmin, idSubs, commentary]);

};

const commentaryIsValid = async dataComment => {
    const { commentary, idSubs } = dataComment;
    if (!commentary || typeof (commentary) !== "string") {
        return false;
    }
    const idSubsChecked = await subscriptionExistsById(idSubs);
    if (!idSubsChecked) {
        return false
    }
        return true;
};

module.exports = { createCommentary };