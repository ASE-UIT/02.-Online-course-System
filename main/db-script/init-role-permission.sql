INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-09-29 06:54:24.783767',
    '2024-09-29 06:54:24.783767',
    null,
    null,
    null,
    null,
    'TECHNICAL_ADMIN'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'HELP_DESK'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'MANAGEMENT_ADMIN'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'BLD'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'CRM'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'HRM'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'ACCOUNTANT'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'STUDENT'
  );
INSERT INTO public.role (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    description,
    id
  )
VALUES (
    '2024-10-02 04:37:11.142773',
    '2024-10-02 04:37:11.142773',
    null,
    null,
    null,
    null,
    'LECTURER'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 04:52:14.213362',
    '2024-10-02 04:52:14.213362',
    null,
    null,
    null,
    'Quản lý khóa học',
    'Cho phép thêm, xóa, sửa khoá học',
    'MANAGE_COURSE'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 04:52:27.742336',
    '2024-10-02 04:52:27.742336',
    null,
    null,
    null,
    'Quản lý nhân viên',
    'Cho phép thêm, xóa, sửa tài khoản nhân viên',
    'MANAGE_EMPLOYEE'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 04:52:27.884424',
    '2024-10-02 04:52:27.884424',
    null,
    null,
    null,
    'Duyệt đăng ký giảng viên',
    'Cho phép duyệt đăng ký giảng viên',
    'APPROVE_LECTURER_REGISTER'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 04:52:28.029000',
    '2024-10-02 04:52:28.029000',
    null,
    null,
    null,
    'Duyệt khóa học',
    'Cho phép duyệt các thay đổi hoặc thêm khóa học',
    'APPROVE_COURSE'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 04:52:28.163727',
    '2024-10-02 04:52:28.163727',
    null,
    null,
    null,
    'Quản lý học viên',
    'Cho phép thêm, xóa, sửa học viên',
    'MANAGE_STUDENT'
  );
INSERT INTO public.permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    name,
    description,
    id
  )
VALUES (
    '2024-10-02 08:38:31.197075',
    '2024-10-02 08:38:31.197075',
    null,
    null,
    null,
    'Quản lý giảng viên',
    'Cho phép quản lý giảng viên',
    'MANAGE_LECTURER'
  );
-- ROLE PERMISSION
INSERT INTO public.roles_permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    role_id,
    permission_id
  )
VALUES (
    '2024-10-02 04:53:52.936919',
    '2024-10-02 04:53:52.936919',
    null,
    null,
    null,
    'MANAGEMENT_ADMIN',
    'MANAGE_COURSE'
  );
INSERT INTO public.roles_permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    role_id,
    permission_id
  )
VALUES (
    '2024-10-02 04:53:52.936919',
    '2024-10-02 04:53:52.936919',
    null,
    null,
    null,
    'MANAGEMENT_ADMIN',
    'MANAGE_EMPLOYEE'
  );
INSERT INTO public.roles_permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    role_id,
    permission_id
  )
VALUES (
    '2024-10-02 04:54:14.838999',
    '2024-10-02 04:54:14.838999',
    null,
    null,
    null,
    'MANAGEMENT_ADMIN',
    'MANAGE_STUDENT'
  );
INSERT INTO public.roles_permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    role_id,
    permission_id
  )
VALUES (
    '2024-10-02 08:38:46.330898',
    '2024-10-02 08:38:46.330898',
    null,
    null,
    null,
    'MANAGEMENT_ADMIN',
    'MANAGE_LECTURER'
  );
INSERT INTO public.roles_permissions (
    create_at,
    update_at,
    create_by,
    update_by,
    delete_at,
    role_id,
    permission_id
  )
VALUES (
    '2024-10-02 09:28:57.805318',
    '2024-10-02 09:28:57.805318',
    null,
    null,
    null,
    'MANAGEMENT_ADMIN',
    'APPROVE_LECTURER_REGISTER'
  );