import query from '../config/database';

class UserService {
  async createUser(data: { name: string, email: string, age: number }) {
    const result = await query('INSERT INTO Users (name, email, age) VALUES (?, ?, ?)', [data.name, data.email, data.age]);
    return { id: result.insertId, ...data };
  }

  async getUsers(filters: { name?: string, email?: string, age?: number }) {
    let queryUser = 'SELECT * FROM Users WHERE 1=1';
    const params: unknown[] = [];

    if (filters.name) {
      queryUser += ' AND name = ?';
      params.push(filters.name);
    }
    if (filters.email) {
      queryUser += ' AND email = ?';
      params.push(filters.email);
    }
    if (filters.age !== undefined) {
      queryUser += ' AND age = ?';
      params.push(filters.age);
    }

    return await query(queryUser, params);
  }

  async getUser(id: string) {
    const result = await query('SELECT * FROM Users WHERE id = ?', [id]);
    return result[0];
  }

  async updateUser(id: string, data: { name: string, email: string, age: number }) {
    const result = await query('UPDATE Users SET name = ?, email = ?, age = ? WHERE id = ?', [data.name, data.email, data.age, id]);
    if (result.affectedRows === 0) {
      return null;
    }
    return await this.getUser(id);
  }

  async deleteUser(id: string) {
    const result = await query('DELETE FROM Users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, affectedRows: result.affectedRows };
  }
}

export default new UserService();
