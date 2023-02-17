const {Router} = require('express');
const userRoutes = require('../controllers/userController');

const {validateJWT} = require('../middleweares/validateJWT');
const {validateBothAdmins} = require('../middleweares/validateBothAdmins');

const router = Router();

router.post('/',[validateJWT, validateBothAdmins],userRoutes.createNewUser);
router.get('/',[validateJWT, validateBothAdmins],userRoutes.getAllUsers);
router.get('/:id',[validateJWT, validateBothAdmins],userRoutes.getUserById);

router.routeName = '/users';

module.exports = router;

