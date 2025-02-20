Hello !

This project includes information about pagination, sorting, filters, authentication and authorization, working with emails and images in Node.js. Creating user-friendly navigation between pages, setting up sorting configurations for correct sorting of results, and applying filters for precise selection of data. These tools can help you make your application more user-friendly and efficient.

ROUTERS:

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));

router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));

router.post('/students', ctrlWrapper(createStudentController));

router.post(
'/',
validateBody(createStudentSchema),
ctrlWrapper(createStudentController),
);

router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));

router.put('/students/:studentId', ctrlWrapper(upsertStudentController));

router.put(
'/students/:studentId',
validateBody(createStudentSchema),
ctrlWrapper(upsertStudentController),
);

router.patch('/students/:studentId', ctrlWrapper(patchStudentController));

router.patch(
'/students/:studentId',
validateBody(updateStudentSchema),
ctrlWrapper(patchStudentController),
);

router.use(authenticate);

router.get('/', ctrlWrapper(getStudentsController));

//

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

router.get(
'/:studentId',
checkRoles(ROLES.TEACHER, ROLES.PARENT),
isValidId,
ctrlWrapper(getStudentByIdController),
);

router.post(
'/',
checkRoles(ROLES.TEACHER),
validateBody(createStudentSchema),
ctrlWrapper(createStudentController),
);

router.put(
'/:studentId',
checkRoles(ROLES.TEACHER),
isValidId,
validateBody(createStudentSchema),
ctrlWrapper(upsertStudentController),
);

router.patch(
'/:studentId',
checkRoles(ROLES.TEACHER, ROLES.PARENT),
isValidId,
validateBody(updateStudentSchema),
ctrlWrapper(patchStudentController),
);

router.delete(
'/:studentId',
checkRoles(ROLES.TEACHER),
isValidId,
ctrlWrapper(deleteStudentController),
);

//

router.post(
'/',
checkRoles(ROLES.TEACHER),
isValidId,
upload.single('photo'), // bu middleware'i ekliyoruz
validateBody(createStudentSchema),
ctrlWrapper(createStudentController),
);

router.put(
'/:studentId',
checkRoles(ROLES.TEACHER),
isValidId,
upload.single('photo'), // bu middleware'i ekliyoruz
validateBody(createStudentSchema),
ctrlWrapper(upsertStudentController),
);

router.patch(
'/:studentId',
checkRoles(ROLES.TEACHER, ROLES.PARENT),
isValidId,
upload.single('photo'), // bu middleware'i ekliyoruz
validateBody(updateStudentSchema),
ctrlWrapper(patchStudentController),
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Project Link (RENDER), use for Postman APP:

https://nodejs-basics-eykh.onrender.com/

Muhammet Uzunoglu. // 2025
