import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const users = JSON.parse(fs.readFileSync('public/users.json', 'utf-8'));
      const userId = parseInt(req.body.id, 10); 
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        // User not found
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Update the user information
      users[userIndex] = {
        ...users[userIndex],
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      fs.writeFileSync('public/users.json', JSON.stringify(users, null, 2));

      res.status(200).json(users[userIndex]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
