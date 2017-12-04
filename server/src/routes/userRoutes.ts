import { useAsPath } from "tslint/lib/configuration";
import { Router } from 'express';
import * as userController from "../controllers/user";
import * as passportConfig from "../config/passport";

const router = Router();

//user routes
router.route('/login').post(userController.postLogin);
router.route('/signup').post(userController.postSignup);
router.route('/forgot').post(userController.postForgot);
router.route("/reset/:token").get(userController.getReset);
router.route("/reset/:token").post(userController.postReset);
router.route('/account').get(passportConfig.isAuthenticated, userController.getAccount);
router.route("/account/profile").post(passportConfig.isAuthenticated, userController.postUpdateProfile); // Update User Data
router.route("/account/password").post(passportConfig.isAuthenticated, userController.postUpdatePassword); // Update Password
router.route('/getTeamMembers/:userId').get(passportConfig.isAuthenticated, userController.getTeamMembers); // Gets all Members in a team
router.route("/getChildUser/:userId").get(passportConfig.isAuthenticated, userController.getChildUserInfo); // Get Child User Information
router.route("/removeChildUser/:userId").delete(passportConfig.isAuthenticated, userController.removeChildUser) // This needs work 
// router.route('/updateUser').post(userController.updateUserInfo); //updates users data
// router.route('/getTeamMembers/:userId').get(userController.getTeamMembers); //Get all members in a team
// router.route('/childUserInfo/:userId').get(userController.childUserInfo);//Get Child User Information
// router.route('/removeChildUser/:userId').delete(userController.removeChildUser); //Remove Child User
// router.route('/changePassword').post(userController.changePassword); //Changes User Password
// router.route('/checkUserToken').post(userController.checkUserToken); //Checks Valid User on everypage load

export default router;