const User = require('../models/User.model');

exports.register = async (req, res) => {
if (login && typeof login === 'string' && password && typeof password === 'string'){
    const userWithLogin = await User.findOne({ login });
    if(userWithLogin){
        res.status(400).send({ message: 'Usser with this login already excists'});
    }
}
res.send('register');

}

exports.login = async (req, res) =>{

}