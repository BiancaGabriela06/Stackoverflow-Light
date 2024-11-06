// signUpController.test.js
const { signUpController } = require('../controllers/userController');
const UserService = require('../services/userService'); // Import the service to mock it

jest.mock('../services/userService'); // Mock the entire service module

describe('signUpController', () => {
   let req, res;

   beforeEach(() => {
       req = { body: { username: 'john', email: 'john@example.com', password: 'password123A' } };
       res = { 
           status: jest.fn().mockReturnThis(), 
           json: jest.fn() 
       };
   });

   afterEach(() => {
       jest.clearAllMocks(); // Clear mocks after each test
   });

   test(`should return 201 and message 'User registered successfully!'`, async () => {
       // Mock `findUserByEmail` to simulate a non-existent user
       UserService.findUserByEmail.mockResolvedValue([]);
       // Mock `createUser` to simulate a successful user creation
       UserService.createUser.mockResolvedValue({ affectedRows: 1 });

       await signUpController(req, res);

       expect(res.status).toHaveBeenCalledWith(201);
       expect(res.json).toHaveBeenCalledWith({
           message: 'User registered successfully!',
       });
   });

   test(`should return 400 if user already exists`, async () => {
       // Mock `findUserByEmail` to simulate an existing user
       UserService.findUserByEmail.mockResolvedValue([{ id: 1, email: 'john@example.com' }]);

       await signUpController(req, res);

       expect(res.status).toHaveBeenCalledWith(400);
       expect(res.json).toHaveBeenCalledWith({
           message: 'User already exists',
       });
   });
});
