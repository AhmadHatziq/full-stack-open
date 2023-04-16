const listHelper = require('../utils/list_helper')

test('Dummy test that should return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})