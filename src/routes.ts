import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createTagController = new CreateTagController();
const authUserController = new AuthUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentController =
	new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
	new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();

// o middleware é passado entre o path e o conrtroller da rota
router.post(
	"/tags",
	ensureAuthenticated,
	ensureAdmin,
	createTagController.handle,
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);
router.post("/login", authUserController.handle);
router.post(
	"/compliments",
	ensureAuthenticated,
	createComplimentController.handle,
);

router.get(
	"/users/compliments/send",
	ensureAuthenticated,
	listUserSendComplimentController.handle,
);
router.get(
	"/users/compliments/receive",
	ensureAuthenticated,
	listUserReceiveComplimentsController.handle,
);

export { router };
