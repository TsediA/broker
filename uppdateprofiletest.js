const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index.js'); // Adjust the path to your Express app
const User = require('../model/userSchema'); // Adjust the path to your User model
const bcrypt = require('bcrypt');

// Mock function to simulate token generation
const generateToken = (userId) => {
    // Implement your JWT token generation logic here
    return `token-for-${userId}`; // Example placeholder
};

describe('PUT /update', () => {
    let token;
    let userId;

    before(async() => {
        // Create a user and get a token for authentication
        const user = await User.create({
            username: 'testuser',
            name: 'Test User',
            phone: '1234567890',
            password: await bcrypt.hash('testpassword', 10)
        });

        userId = user._id;
        token = generateToken(userId); // Generate a token for this user
    });

    after(async() => {
        // Clean up the test user
        await User.deleteOne({ _id: userId });
    });

    it('should update the user profile successfully', async() => {
        const response = await request(app)
            .put('/update')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'updateduser',
                name: 'Updated User',
                phone: '0987654321',
                password: 'newpassword'
            });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Profile updated successfully');
        expect(response.body.user.username).to.equal('updateduser');
        expect(response.body.user.name).to.equal('Updated User');
        expect(response.body.user.phone).to.equal('0987654321');
    });

    it('should return 404 if user not found', async() => {
        const invalidToken = generateToken('invalidUserId'); // Generate token for a non-existent user
        const response = await request(app)
            .put('/update')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({
                username: 'testuser'
            });

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
    });

    it('should return 500 on server error', async() => {
        // Simulate a server error
        const response = await request(app)
            .put('/update')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'testuser',
                name: null, // This should cause an error if your validation checks for null
            });

        expect(response.status).to.equal(500);
        expect(response.body.error).to.equal('Failed to update profile');
    });
});