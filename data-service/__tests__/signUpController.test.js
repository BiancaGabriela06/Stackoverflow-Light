jest.useFakeTimers()

const AuthService = require('../services/authService'); // Adjust to your actual service file
const { signUpController } = require('../controllers/auth');

jest.mock('../services/authService');

describe('signUpController', () => {
    let req, res;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    beforeEach(() => {
        req = { body: { username: 'john', email: 'john@example.com', password: 'password123A' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.useRealTimers();
    });

    afterEach(async () => {
        await jest.resetModules(); 
        await jest.clearAllMocks();
        await sleep(2000);
    });

    test('should return 201 and success message if user does not exist', async () => {
        AuthService.findUserByEmail.mockResolvedValue([]);
        AuthService.createUser.mockResolvedValue({ affectedRows: 1 });

        await signUpController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully!',
        });
    });

    test('should return 400 if user already exists', async () => {
        AuthService.findUserByEmail.mockResolvedValue([{ id: 1, email: 'john@example.com' }]);

        await signUpController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User already exists',
        });
    });

    test('should return 500 if there is an internal server error', async () => {
        AuthService.findUserByEmail.mockRejectedValue(new Error('DB Error'));

        await signUpController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error',
        });
    });
});
