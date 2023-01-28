const User = require('../models/User.model');
const bcrypt = require('bcrypt.js');

exports.register = async (req, res) => {
    try {

        const { login, password } = req.body;
        console.log(req.body, req.file);

        if (login && typeof login === 'string' && password && typeof password === 'string' && req.file) {
           const[, ext] = req.file.originalname.split('.');
           if(ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg'){
            res.status(400).send({message: 'File extension in not correct'});
           }  
           
           const userWithLogin = await User.findOne({ login });
         if (userWithLogin) {
            res.status(409).send({ message: 'Usser with this login already excists' });
            }

            const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
            res.status(201).send({ message: 'User created' + user.login });
        } else {
            res.status(400).send({ message: 'Bad request' });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.login = user.login;
                    res.status(200).send({ message: 'Login successful' })
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }
        }

    } catch (err){
    res.status(500).send({ message: err.message });
    }
}