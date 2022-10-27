 const crypto=require('crypto');

module.exports={
JWT_SIGN_KEY:crypto.randomBytes(16).toString('hex'),
 JWT_SECRET_KEY:crypto.randomBytes(16).toString('hex'),

}