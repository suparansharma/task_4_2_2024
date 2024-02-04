import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const users = JSON.parse(fs.readFileSync('public/users.json', 'utf-8'));
      const newUser = {
        id: users.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      users.push(newUser);
      fs.writeFileSync('public/users.json', JSON.stringify(users, null, 2));

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
