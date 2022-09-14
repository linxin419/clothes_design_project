var registerSql = {
    insert: 'INSERT INTO user(password,phone,creationTime) VALUES(?,?,?)',
    queryAll: 'SELECT * FROM user'
}
module.exports = registerSql
