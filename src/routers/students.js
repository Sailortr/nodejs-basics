// src/routers/students.js

import { Router } from 'express';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateStudentSchema } from '../validation/students.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

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

export default router;
