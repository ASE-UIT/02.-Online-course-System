import { roleController } from '@/container/role.container';
import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleReq } from '@/dto/role/create-role.req';
import { UpdateRoleReq } from '@/dto/role/update-role.req';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const roleRouter = express.Router();

roleRouter

  .post('/', classValidate(CreateRoleReq), roleController.common.create.bind(roleController.common))
  .put('/update/:id', classValidate(UpdateRoleReq), roleController.common.update.bind(roleController.common))
  .delete('/delete/:id', roleController.common.delete.bind(roleController.common))
  .get('/:id', roleController.common.findOne.bind(roleController.common))
  .get('/', roleController.common.findAll.bind(roleController.common));

export default roleRouter;
