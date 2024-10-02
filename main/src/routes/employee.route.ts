import { PERMISSIONS } from '@/constants/permission.constants';
import { employeeController } from '@/container/employee.container';
import { CreateEmployeeReq } from '@/dto/employee/create-employee.req';
import { EmployeeLoginReq } from '@/dto/employee/employee-login.req';
import { UpdateEmployeeReq } from '@/dto/employee/update-employee.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkPermission } from '@/middleware/check-permission.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const employeeRouter = express.Router();

employeeRouter
  .post('/login', classValidate(EmployeeLoginReq), employeeController.login.bind(employeeController))

  .post(
    '/create',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    classValidate(CreateEmployeeReq),
    employeeController.create.bind(employeeController)
  )

  .get('/me', authenticateJWT, employeeController.getMe.bind(employeeController))

  .get(
    '/paging',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    employeeController.findAllWithPaging.bind(employeeController)
  )

  .get(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    employeeController.findOne.bind(employeeController)
  )

  .get(
    '/',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    employeeController.findAll.bind(employeeController)
  )

  .put(
    '/:id',
    authenticateJWT,
    classValidate(UpdateEmployeeReq),
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    employeeController.common.update.bind(employeeController.common)
  )

  .delete(
    '/:id',
    authenticateJWT,
    checkPermission([PERMISSIONS.MANAGE_EMPLOYEE]),
    employeeController.common.delete.bind(employeeController.common)
  );
export default employeeRouter;
