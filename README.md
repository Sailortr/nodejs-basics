Hello !

In this project, there is information about pagination, sorting, and filters in Node.js. Creating user-friendly navigation between pages, setting up sorting configurations for accurate ordering of results, and applying filters for precise selection of data. These tools can help make your application more user-friendly and effective.

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Project Link (RENDER), use for Postman APP:

https://nodejs-basics-eykh.onrender.com/

Muhammet Uzunoglu. // 2025
