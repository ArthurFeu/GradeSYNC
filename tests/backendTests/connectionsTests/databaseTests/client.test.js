import pool from '../../../../backend/src/connections/database/client';

describe('Database Pool', () => {
  afterAll(async () => {
    // close the pool after all tests
    await pool.end();
  });

  test('should create a pool and verify its connections', async () => {
    expect(pool).toBeDefined();
    expect(pool).toHaveProperty('query');

    try {
      const [rows] = await pool.query('SELECT 1');
      expect(rows).toBeDefined();
      expect(Array.isArray(rows)).toBe(true);
    } catch (error) {
      fail('Database connection test failed: ' + error.message);
    }
  });
});
