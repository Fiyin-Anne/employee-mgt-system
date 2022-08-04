const db = require('../db/models/index');

const getProfile = async (data) => {

    try {
        const { userId } = data;

        //check if id exists in user db
        if(typeof userId !== 'number') throw new Error('User ID must be a number.')
        const existingUser = await db.User.findOne({
            where: { id: userId },
            raw: true,
            include: [
                {
                    model: db.Salary,
                    attributes: ['monthly', 'yearly'],
                    raw: true
                },
                {
                    model: db.Timeoff,
                    as: 'Timeoffs',
                    attributes: ['type', 'duration', 'start_date', 'end_date', 'status'],
                    raw: true

                }
            ],
        });

        if(!existingUser) throw new Error('User not found');

        const profile = Object.assign({}, existingUser);
        delete profile.password;
        delete profile.accesstk;

        return profile;
    } catch (err) {
        let message = err.message || "Unable to get profile."
        throw new Error(message)
    }

}

const requestUpdate = async (data) => {
    try {
        const { userId, fields } = data;

        //check if id exists in user db
        if(typeof userId !== 'number') throw new Error('User ID must be a number.')
        const existingUser = await db.User.findOne({ where: {id: userId}});
        if(!existingUser) throw new Error('User not found');

        let requestdata = {
            userId,
            meta: JSON.stringify(fields),
            status: 'pending'
        }
        const createrequest = await db.Request.create(requestdata);

        return {
            title: 'Request to update profile',
            data: fields,
            status: createrequest.status,
            createdAt: createrequest.createdAt,
            updatedAt: createrequest.updatedAt
        }
    } catch (error) {
        const message = error.message || 'Unable to submit request'
        throw new Error(message);
    }
}

const submitFeedback = async (data) => {
    try {
        const { userId, feedback, email, type } = data;

        //check if id exists in user db
        if(typeof userId !== 'number') throw new Error('User ID must be a number.')
        const existingUser = await db.User.findOne({ where: {id: userId}});
        if(!existingUser) throw new Error('User not found');

        let feedbackemail = email ? email : 'anonymous';
        let feedbackdata = {
            email: feedbackemail,
            feedback,
            status: 'pending',
            type
        }
        
        const result = await db.Feedback.create(feedbackdata);

        return {
            email: data.email || 'anonymous',
            type,
            feedback,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    } catch (error) {
        const message = error.message || 'Unable to submit feedback.'
    } 
}

module.exports = {
    getProfile, requestUpdate, submitFeedback
}