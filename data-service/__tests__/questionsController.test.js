// questionsController.test.js

const moment = require('moment');
const QuestionsService = require('../services/questionsService'); // Adjust the path as needed
const { insertQuestion } = require('../controllers/questionsController'); // Adjust the path as needed

jest.mock('../services/questionsService');

describe('insertQuestion Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                user_id: 1,
                text: 'Sample question text'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.useFakeTimers(); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond with 201 status and success message when question is inserted successfully', async () => {
        QuestionsService.insertQuestion.mockResolvedValueOnce({ insertId: 1 });

        await insertQuestion(req, res);

        expect(QuestionsService.insertQuestion).toHaveBeenCalledWith({
            user_id: req.body.user_id,
            text: req.body.text,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Question added successfully!'
        });
    });

    it('should respond with 500 status and error message on service failure', async () => {
        QuestionsService.insertQuestion.mockRejectedValueOnce(new Error('Database error'));

        await insertQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
